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
