import { useContext } from "react";
import { UsuarioContext } from "./UsuarioContext";

const useUsuario = () => {
  const contexto = useContext(UsuarioContext);
  if (!contexto) {
    throw new Error("useUsuario se tiene que usar dentro de <UsuarioProvider>");
  }
  return contexto;
};

export default useUsuario;
