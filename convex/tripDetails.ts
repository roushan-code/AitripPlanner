import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateTripDetails = mutation({
    args: {
        tripId: v.string(),
        tripDetails: v.any(),
        uid: v.id('UserTable'),
    },
    handler: async (ctx, { tripId, tripDetails, uid }) => {
        return await ctx.db.insert("TripDetailsTable", {
            tripId,
            tripDetails,
            uid,
        });
    }
})