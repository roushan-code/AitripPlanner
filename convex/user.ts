import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: { name: v.string(), imageUrl: v.string(), email: v.string() },
    handler: async (ctx, { name, imageUrl, email }) => {
      const existingUser = await ctx.db
        .query("UserTable")
        .filter((q) => q.eq(q.field("email"), email))
        .collect();
        if (existingUser?.length === 0) {
            const userData={
                name,
                imageUrl,
                email
            }

            const result = await ctx.db.insert("UserTable", userData);
            return result;
        }
        return existingUser[0];
      
    }
})