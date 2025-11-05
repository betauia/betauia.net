import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import svelte from "@astrojs/svelte";

import path from "node:path";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), icon(), svelte()],
  server: { port: 3000, host: "0.0.0.0" },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  site: "https://betauia.net",
  vite: {
    resolve: {
      alias: {
        "@components": path.resolve("./src/components"),
        "@assets": path.resolve("./src/assets"),
        "@layouts": path.resolve("./src/layouts"),
        "@pages": path.resolve("./src/pages"),
        "@lib": path.resolve("./src/lib"),
        "@content": path.resolve("./src/content"),
        "@data": path.resolve("./src/data"),
      },
    },
  },
});
