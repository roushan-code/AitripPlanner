# 🌍 AI Trip Planner

> **Transform your travel dreams into perfectly planned adventures with AI-powered personalized itineraries!**

AI Trip Planner is an intelligent travel companion that creates customized trip itineraries based on your preferences, budget, and travel style. Whether you're planning a romantic getaway, family vacation, or solo adventure, our AI creates detailed day-by-day plans with accommodations, activities, and insider tips.

## ✨ Features

### 🤖 **AI-Powered Trip Planning**
- **Smart Itinerary Generation**: Get personalized day-by-day travel plans
- **Interactive Chat Interface**: Refine your trip through conversational AI
- **Budget-Aware Recommendations**: Plans tailored to your spending preferences
- **Group Size Optimization**: Perfect plans for solo, couple, family, or group travel

### 🎯 **Intelligent Recommendations**
- **Hotel & Accommodation Suggestions**: Curated stays with ratings and pricing
- **Activity & Attraction Planning**: Must-see spots and hidden gems
- **Restaurant & Dining**: Local cuisine recommendations
- **Real-time Image Integration**: Visual previews of destinations and accommodations

### 💼 **User Experience**
- **Secure Authentication**: Google OAuth integration with NextAuth.js
- **Trip Management**: Save, edit, and manage multiple trip plans
- **Responsive Design**: Perfect experience on desktop and mobile
- **Dark/Light Mode**: Comfortable viewing in any environment

### 🗺️ **Travel Tools**
- **Interactive Maps**: Visualize your itinerary geographically
- **Popular Destinations**: Curated list of trending travel spots
- **Real-time Pricing**: Up-to-date accommodation and activity costs
- **Export & Share**: Save and share your trip plans easily

## 🚀 Demo


https://github.com/user-attachments/assets/c79b4894-e4e6-4178-b7ca-b4f59486b4e3



## 🛠️ Tech Stack

### **Frontend**
- **⚛️ Next.js 15.5.3** - React framework with App Router
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🔧 TypeScript** - Type-safe development
- **🎪 Framer Motion** - Smooth animations and interactions
- **🎭 Lucide React** - Beautiful icons and UI elements

### **Backend & Database**
- **🍃 MongoDB** - NoSQL database with Mongoose ODM
- **🔐 NextAuth.js** - Authentication with Google OAuth
- **🌐 Next.js API Routes** - Serverless backend functions

### **AI & External Services**
- **🧠 Google Gemini AI** - Advanced AI for trip planning
- **📷 Unsplash API** - High-quality destination images
- **📸 Pexels API** - Additional image resources
- **🗺️ OpenStreetMap** - Map data and location services
- **🛡️ Arcjet** - Rate limiting and security

### **Deployment & Tools**
- **▲ Vercel** - Deployment platform (recommended)
- **📦 NPM** - Package management
- **🔍 ESLint** - Code quality and consistency

## ⚡ Quick Start

### **Prerequisites**
- Node.js 18.0 or later
- MongoDB database (local or cloud)
- Google OAuth credentials
- Gemini AI API key

### **1. Clone the Repository**
```bash
git clone https://github.com/roushan-code/AitripPlanner.git
cd ai_trip_planner
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
Create a `.env.local` file in the root directory:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aitrip

# NextAuth Configuration
NEXTAUTH_SECRET=your-secure-random-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI Services
GEMINI_API_KEY=your-gemini-api-key

# Image APIs (Optional - for better image results)
UNSPLASH_ACCESS_KEY=your-unsplash-access-key
PEXELS_API_KEY=your-pexels-api-key

# Security (Optional)
ARCJET_KEY=your-arcjet-api-key
```

### **4. Start Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your AI Trip Planner in action! 🎉

## 🎯 How It Works

### **1. 🗣️ Tell Us Your Dreams**
Simply describe your ideal trip - destination, duration, budget, and travel style. Our AI understands natural language!

### **2. 🤖 AI Creates Your Plan**
Our advanced AI analyzes your preferences and generates a personalized itinerary with:
- Daily activity schedules
- Accommodation recommendations
- Restaurant suggestions
- Transportation options
- Budget breakdowns

### **3. 🎨 Customize & Refine**
Chat with our AI to modify your plan:
- Add or remove activities
- Adjust budget ranges
- Change accommodation preferences
- Modify trip duration

### **4. 📱 Save & Share**
Save your trips to your account and share them with travel companions!

## 🚀 API Endpoints

### **Trip Planning**
- `POST /api/gemini` - AI-powered trip generation
- `GET /api/trips/user` - Get user's saved trips
- `POST /api/trips/create` - Save new trip plan

### **User Management**
- `GET /api/user` - Get user profile
- `POST /api/user` - Update user information

### **Image Services**
- `POST /api/osm-place-detail` - Get destination images

## 📁 Project Structure

```
ai_trip_planner/
├── app/                          # Next.js App Router
│   ├── _components/              # Reusable React components
│   ├── api/                      # API routes
│   ├── auth/                     # Authentication pages
│   ├── create-new-trip/          # Trip creation flow
│   └── my-trips/                 # User's saved trips
├── components/                   # UI components
│   └── ui/                       # Shadcn/ui components
├── lib/                          # Utility functions
│   ├── auth.ts                   # NextAuth configuration
│   └── mongodb/                  # Database models & connection
├── public/                       # Static assets
└── hooks/                        # Custom React hooks
```

## 🔧 Configuration Guide

### **Google OAuth Setup**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 Client ID
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### **MongoDB Setup**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster
3. Get connection string
4. Add to `MONGODB_URI` in `.env.local`

### **Gemini AI Setup**
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Generate API key
3. Add to `GEMINI_API_KEY` in `.env.local`

## 🚢 Deployment

### **Deploy to Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push!

### **Other Deployment Options**
- **Netlify**: Static deployment with serverless functions
- **Railway**: Full-stack deployment with database
- **Docker**: Containerized deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent trip planning
- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **MongoDB** for flexible data storage
- **Unsplash & Pexels** for beautiful destination images

## 📧 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/roushan-code/AitripPlanner/issues)
- **Developer**: [@roushan-code](https://github.com/roushan-code)

---

<div align="center">

**⭐ Star this repo if you find it useful! ⭐**

Made with ❤️ by [Roushan](https://github.com/roushan-code)

</div>
