import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bios: defineTable({
    username: v.string(),
    display_name: v.string(),
    bio: v.string(),
    pronouns: v.optional(v.string()),
    links: v.optional(v.string()),
    profile_image: v.optional(v.string()),
    full_name: v.optional(v.string()),
    created_at: v.optional(v.number()),
    updated_at: v.number(),
  }).index("by_username", ["username"]),
});