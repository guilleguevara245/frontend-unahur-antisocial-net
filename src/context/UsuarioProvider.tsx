import { useEffect, useState, type ReactNode } from "react";
import { UsuarioContext } from "./UsuarioContext";
import type { Usuario } from "../types/usuario";
import { obtenerUsuarioPorNickName } from "../api/usuarios";

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

// Guarda el usuario en localStorage, o lo borra si es null.
const guardarUsuario = (usuario: Usuario | null) => {
  try {
    if (usuario) {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(CLAVE_STORAGE);
    }
  } catch (error) {
    console.error("No se pudo actualizar el usuario en localStorage", error);
  }
};

interface UsuarioProviderProps {
  children: ReactNode;
}

const UsuarioProvider = ({ children }: UsuarioProviderProps) => {
  const [usuario, setUsuario] = useState<Usuario | null>(leerUsuarioGuardado);

  // La sesión guardada puede venir de otra base de datos (o el usuario pudo haberse borrado):
  // al arrancar se confirma contra el backend que el nickName siga existiendo.
  useEffect(() => {
    const guardado = leerUsuarioGuardado();
    if (!guardado) return;

    let cancelado = false;
    const verificarSesion = async () => {
      try {
        const actual = await obtenerUsuarioPorNickName(guardado.nickName);
        if (cancelado) return;
        // Si ya no existe se cierra la sesión; si existe, se actualizan sus datos (id, email).
        setUsuario(actual);
        guardarUsuario(actual);
      } catch (error) {
        // Error de red o del servidor: se mantiene la sesión para no desloguear por una caída momentánea.
        console.error("No se pudo verificar la sesión guardada", error);
      }
    };
    verificarSesion();

    return () => {
      cancelado = true;
    };
  }, []);

  const iniciarSesion = (nuevoUsuario: Usuario) => {
    setUsuario(nuevoUsuario);
    guardarUsuario(nuevoUsuario);
  };

  const cerrarSesion = () => {
    setUsuario(null);
    guardarUsuario(null);
  };

  return (
    <UsuarioContext value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext>
  );
};

export default UsuarioProvider;
