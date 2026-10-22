/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_URL: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY: string;
  readonly PUBLIC_SOME: string;
  readonly PUBLIC_THING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
