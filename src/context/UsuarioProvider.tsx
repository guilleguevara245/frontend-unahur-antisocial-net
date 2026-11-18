import { useState, type ReactNode } from "react";
import { UsuarioContext } from "./UsuarioContext";
import type { Usuario } from "../types/usuario";

const CLAVE_STORAGE = "usuario";

// Lee el usuario guardado; si no hay o el storage falla, arranca sin sesión.
const leerUsuarioGuardado = (): Usuario | null => {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? (JSON.parse(guardado) as Usuario) : null;
  } catch {
    return null;
  }
};

interface UsuarioProviderProps {
  children: ReactNode;
}

const UsuarioProvider = ({ children }: UsuarioProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(leerUsuarioGuardado);

  const iniciarSesion = (nuevoUsuario: Usuario) => {
    setUsuario(nuevoUsuario);
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevoUsuario));
    } catch (error) {
      console.error("No se pudo guardar el usuario en localStorage", error);
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    try {
      localStorage.removeItem(CLAVE_STORAGE);
    } catch (error) {
      console.error("No se pudo borrar el usuario de localStorage", error);
    }
  };

  return (
    <UsuarioContext value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext>
  );
};

export default UsuarioProvider;
