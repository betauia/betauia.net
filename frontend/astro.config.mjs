import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";

import path from "node:path";

export default defineConfig({
  integrations: [
    starlight({
      title: "Wikibetia",
      description: "Den frie encyklopedien for datastudenter ved UiA Grimstad.",
      favicon: "/favicon.ico",
      defaultLocale: "root",
      locales: { root: { label: "Norsk", lang: "nb" } },
      disable404Route: true,
      expressiveCode: false,
      editLink: { baseUrl: "https://github.com/betauia/betauia.net/edit/master/frontend/" },
      customCss: ["./src/styles/wiki.css"],
      components: {
        Header: "./src/components/wiki/Header.astro",
        PageFrame: "./src/components/wiki/PageFrame.astro",
        ThemeProvider: "./src/components/wiki/ThemeProvider.astro",
        MobileMenuToggle: "./src/components/wiki/MobileMenuToggle.astro",
      },
      sidebar: [
        { label: "Forside", link: "/wiki/" },
        { label: "Generalforsamling", items: [{ autogenerate: { directory: "wiki/genfors" } }] },
        { label: "Møtereferater", items: [{ autogenerate: { directory: "wiki/moter" } }] },
        { label: "Guider", items: [{ autogenerate: { directory: "wiki/guider" } }] },
        { label: "Lore", items: [{ autogenerate: { directory: "wiki/lore" } }] },
      ],
    }),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    icon(),
    svelte(),
  ],
  redirects: {
    "/genfors": "/wiki/genfors/",
    "/genfors/2025": "/wiki/genfors/2025/",
    "/genfors/2026": "/wiki/genfors/2026/",
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  adapter: node({
    mode: "standalone",
  }),
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
  site: "https://betauia.net",
  vite: {
    // Use the shared .env in the project root
    envDir: "..",
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
