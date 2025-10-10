// scripts/fix-db-duplicates.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable in .env.local');
  process.exit(1);
}

// Define a simplified User schema just for the fix
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  imageUrl: String,
  subscription: String,
  requestsCount: Number,
  lastRequestDate: Date,
  clerkId: String,
});

// Connect to MongoDB and fix issues
async function fixDuplicates() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get direct access to the collection to bypass schema validation
    const User = mongoose.model('User', userSchema);
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    // 1. Find all documents
    const allUsers = await usersCollection.find({}).toArray();
    console.log(`Found ${allUsers.length} total users`);
    
    // 2. Find documents with null clerkId
    const nullClerkIdUsers = allUsers.filter(user => user.clerkId === null);
    console.log(`Found ${nullClerkIdUsers.length} users with null clerkId`);
    
    if (nullClerkIdUsers.length > 0) {
      // 3. Delete all documents with null clerkId
      const result = await usersCollection.deleteMany({ clerkId: null });
      console.log(`Deleted ${result.deletedCount} users with null clerkId`);
    }
    
    // 4. Find duplicate clerkIds
    const clerkIds = {};
    const duplicates = [];
    
    allUsers.forEach(user => {
      if (user.clerkId && user.clerkId !== null) {
        if (clerkIds[user.clerkId]) {
          duplicates.push(user);
        } else {
          clerkIds[user.clerkId] = true;
        }
      }
    });
    
    console.log(`Found ${duplicates.length} users with duplicate clerkIds`);
    
    // 5. Keep only the most recent document for each duplicate clerkId
    for (const clerkId in clerkIds) {
      if (clerkIds[clerkId]) {
        const duplicatesForId = await usersCollection.find({ clerkId }).toArray();
        
        if (duplicatesForId.length > 1) {
          console.log(`Found ${duplicatesForId.length} duplicates for clerkId: ${clerkId}`);
          
          // Sort by createdAt or _id to keep the most recent one
          duplicatesForId.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
              return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return b._id.getTimestamp() - a._id.getTimestamp();
          });
          
          // Keep the first one (most recent) and delete the rest
          const toDelete = duplicatesForId.slice(1).map(doc => doc._id);
          
          if (toDelete.length > 0) {
            await usersCollection.deleteMany({ _id: { $in: toDelete } });
            console.log(`Deleted ${toDelete.length} duplicate documents for clerkId: ${clerkId}`);
          }
        }
      }
    }
    
    // 6. Drop and recreate the index
    console.log('Dropping existing indexes on clerkId...');
    try {
      await usersCollection.dropIndex('clerkId_1');
      console.log('Successfully dropped existing clerkId index');
    } catch (err) {
      console.log('No existing clerkId index to drop or error dropping index:', err.message);
    }
    
    // 7. Create new index with sparse option
    console.log('Creating new sparse unique index on clerkId...');
    await usersCollection.createIndex(
      { clerkId: 1 },
      { unique: true, sparse: true, background: true }
    );
    console.log('Successfully created new clerkId index');
    
    console.log('Database cleanup complete!');
  } catch (error) {
    console.error('Error fixing duplicates:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the fix
fixDuplicates();