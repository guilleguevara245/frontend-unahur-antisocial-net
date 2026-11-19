// URL base de la API. Por defecto es el backend local; se puede cambiar con VITE_API_URL en un archivo .env.
export const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
