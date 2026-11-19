/// <reference types="vite/client" />

// Variables de entorno propias del proyecto (se leen con import.meta.env).
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
