import { API_URL } from "./config";
import type { Usuario } from "../types/usuario";

export const obtenerUsuarioPorNickName = async (nickName: string): Promise<Usuario | null> => {
  const respuesta = await fetch(`${API_URL}/users/${encodeURIComponent(nickName)}`);
  if (respuesta.status === 404 || respuesta.status === 400) {
    return null;
  }
  if (!respuesta.ok) {
    throw new Error("Error al obtener el usuario: " + respuesta.status);
  }
  return await respuesta.json();
};

export const obtenerUsuarios = async (): Promise<Usuario[] > => {
  
  const respuesta = await fetch("http://localhost:3000/users/");

  if (!respuesta.ok) {
    throw new Error("Error al obtener el usuario: " + respuesta.status);
  }
  return await respuesta.json();
};

export interface DatosNuevoUsuario {
  nickName: string;
  email: string;
}


export type ResultadoRegistro =
  | { ok: true; usuario: Usuario }
  | { ok: false; error: string };

// Crea el usuario en la tabla User. Los errores esperables (datos inválidos, nickName/email repetido)
// vuelven como { ok: false }; los de red o del servidor se lanzan.
export const crearUsuario = async (datos: DatosNuevoUsuario): Promise<ResultadoRegistro> => {
  const respuesta = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (respuesta.status === 409) {
    return { ok: false, error: "El nickName o el email ya están registrados" };
  }
  if (respuesta.status === 400) {
    return { ok: false, error: "Datos inválidos: el nickName debe tener entre 3 y 50 caracteres y el email debe ser válido" };
  }
  if (!respuesta.ok) {
    throw new Error("Error al crear el usuario: " + respuesta.status);
  }
  return { ok: true, usuario: await respuesta.json() };
};
