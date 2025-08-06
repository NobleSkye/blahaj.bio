import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [clerk(), tailwind()],
  adapter: node({ mode: "standalone" }),
  output: "server",
});



