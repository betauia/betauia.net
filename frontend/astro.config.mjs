import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import i18nPages from "./integrations/i18n-pages.mjs";

import path from "node:path";

// https://astro.build/config
export default defineConfig({
  integrations: [i18nPages(), tailwind(), mdx(), icon(), svelte()],
  server: { port: 3000, host: "0.0.0.0" },
  adapter: node({
    mode: "standalone",
  }),
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-light",
      darkTheme: "github-dark",
      wrap: true,
    },
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
        "@i18n": path.resolve("./src/i18n"),
      },
    },
  },
  i18n: {
    defaultLocale: "no",
    locales: ["en", "no"],
    routing: {
      prefixDefaultLocale: false
    }
  },
});
