import React, { useState } from "react";
import type { SubmitEvent } from "react";

interface CrearPublicacionFormProps {}

function CrearPublicacionForm() {
  const [descripcion, setDescricion] = useState("");

  const [imagenes, setImagenes] = useState<string[]>([""]);

  const agreagarImagen = () => {
    setImagenes([...imagenes, ""]);
  };

  const handleImagenChange = (index: number, value: string) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = value;

    setImagenes(nuevasImagenes);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({ descripcion, imagenes });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescricion(e.target.value)}
          required
        />
      </div>

      <h3>Imágenes:</h3>
      <button>Agregar Imagen</button>
    </form>
  );
}

export default CrearPublicacionForm;
