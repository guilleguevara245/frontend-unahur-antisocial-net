import { createContext } from "react";
import type { Usuario } from "../types/usuario";

export interface UsuarioContextValue {
  usuario: Usuario | null;
  iniciarSesion: (usuario: Usuario) => void;
  cerrarSesion: () => void;
}

export const UsuarioContext = createContext<UsuarioContextValue | null>(null);
