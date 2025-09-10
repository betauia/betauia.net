# Astro Frontend

Astro is a web framework for building fast, content-focused websites. It is static-first, while letting you use components from more popular frameworks if needed.

[You can read more about Astro here](https://astro.build/)!

---

## Structure

```
/frontend/
|
├── public/             # Static assets
├── src/
|   ├── pages/          # Route-based pages
|   ├── components/     # UI components
|   ├── layouts/        # Page layouts
|   └── env.d.ts/       # Environment variables
├── astro.config.mjs/   # Astro configs
├── package.json/       # Dependencies and scripts
└── tsconfig.json/      # TypeScript configs
```

There are also other files for example to to configure TailwindCSS. Anyhow, the most important folder is `/src/` where the changes for the actual content is placed.

### Pages

#### File Types

- **Astro (.astro)**: Astro pages are exactly the same as regular HTML, but with a component script where you can import modules and data to use in the document. Check out how they work in the [Astro documentation](https://docs.astro.build/en/basics/astro-pages/#astro-pages).
- **Markdown (.md)**: Markdown is a simple way to write formatted text to the website. Check out this [cheat sheet](https://www.markdownguide.org/cheat-sheet/) for the syntax.
- **MDX (.mdx)**: In short, MDX is Markdown with inline JavaScript (JSX). This makes content really extensible and is prefered over regular Markdown. Read the [official documentation](https://mdxjs.com/) for how it is used.

#### Routing

Routing is simply done by the folder structure in `pages/`. For the routes, the file types are removed and `index` files are placed at the folder.

Examples:

- `pages/betadev/index.astro` is routed to `/betadev/`
- `pages/comedycentral/memes/kubernuts.mdx` is routed to `/comedycentral/memes/kubernuts`

### Components

Components are Astro files that can be used anywhere in a page. This keeps developers from repeating alot of code and makes the HTML more readable. They are imported and used in the Astro component scripts like this:

```astro
---
import SomeAstroComponent from '@components/SomeAstroComponent.astro';
---

<SomeAstroComponent />
```

You can also pass down props and use JSX in them. To check out more, read the [Astro documentations](https://docs.astro.build/en/basics/astro-components/).

### Layouts

Layouts are Astro components that provides reusable structures like page templates. They use the tag `<slot />` to specify where individual page content should be injected. To find out more, check out the [Astro documentations](https://docs.astro.build/en/basics/layouts/).

Here is an example with the prop `title`:

```astro
---
import MainLayout from "@layouts/MainLayout.astro";
---

<MainLayout title="Home">
  <div>Put the content here!</div>
</MainLayout>
```

or within Markdown and MDX with:

```astro
---
layout: src/layouts/MarkdownLayout.astro
title: Comedy Central
---

Put the content here!
```

## Environment Variables

The environment variables that Astro is allowed to use is defined in the `env.d.ts` file. They are not often used and you should never put anything sensitive there since it is public. All the variables need to be define as `PUBLIC_<variablename>` if you need to add one.

This is how you can use them after they are defined:

```astro
---
const backendUrl = import.meta.env.PUBLIC_BACKEND_URL;
---
<div>{backendUrl}</div>
```
