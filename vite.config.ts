import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  assetsInclude: ["**/*.fbx"], // Add FBX to included assets
});
