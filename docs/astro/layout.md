# Astro layout

## Dependencies

- TypeScript
  - JavaScript with syntax for types.
  - Documentation at https://www.typescriptlang.org/docs/
- Tailwind CSS
  - CSS framework, with premade classes.
  - Documentation at https://tailwindcss.com/docs/
- Tailwind CSS Typography
  - Tailwind CSS plugin for prose classes for default style in rendered markdown or pulled content.
  - Documentation at https://github.com/tailwindlabs/tailwindcss-typography

## File structure

- **Public (`/web/public/`)**
  - A static folder for images and files used on the website.

- **Source (`/web/src/`)**
  - Contains all astro files and content for the website.

- **Routed pages (`/web/src/pages/`)**
  - A file tree containing all pages for the website.
  - Dynamically routed based on file structure and file names.
    - Can be nested in folders.
    - index.astro used as the folder name or root URLs.

- **Page layout (`/web/src/layouts/`)**
  - Stores layouts for the different types of pages.
  - Can be imported as HTML and takes a title parameter.
  - Currently `Main.astro` and `Markdown.astro` for regular pages and markdown pages.

- **Components (`/web/src/components/`)**
  - Stores UI components that can be imported for the pages.
