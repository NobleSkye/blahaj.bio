import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveBio = mutation({
  args: {
    username: v.string(),
    display_name: v.string(),
    bio: v.string(),
    pronouns: v.optional(v.string()),
    links: v.optional(v.string()),
    profile_image: v.optional(v.string()),
    full_name: v.optional(v.string()),
    custom_background: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("bios")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (existing) {
      // Update existing bio
      const bioData = {
        ...args,
        updated_at: Date.now(),
      };
      return await ctx.db.patch(existing._id, bioData);
    } else {
      // Create new bio with created_at timestamp
      const bioData = {
        ...args,
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      return await ctx.db.insert("bios", bioData);
    }
  },
});

export const getBio = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bios")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
  },
});

export const getAllBios = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bios").collect();
  },
});

export const deleteBio = mutation({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("bios")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
    
    if (existing) {
      await ctx.db.delete(existing._id);
      return { success: true };
    }
    return { success: false, error: "Bio not found" };
  },
});

export const updateSupporterStatus = mutation({
  args: { 
    username: v.string(), 
    is_supporter: v.boolean() 
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("bios")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, { 
        is_supporter: args.is_supporter,
        updated_at: Date.now(),
      });
      return { success: true };
    }
    return { success: false, error: "Bio not found" };
  },
});