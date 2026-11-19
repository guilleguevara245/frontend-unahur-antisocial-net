export const FORMATOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp"];
export const TAMANIO_MAXIMO_MB = 5;

export interface ErroresPublicacion {
  descripcion?: string;
  imagenes?: string;
}

export const validarArchivoImagen = (file: File): string | null => {
  if (!FORMATOS_PERMITIDOS.includes(file.type)) {
    return "La imagen debe ser jpg, png o webp";
  }
  if (file.size > TAMANIO_MAXIMO_MB * 1024 * 1024) {
    return `La imagen no puede superar los ${TAMANIO_MAXIMO_MB} MB`;
  }
  return null;
};

export const validarPublicacion = (data: {
  descripcion: string;
  imagenes: File[];
}): ErroresPublicacion => {
  const newErrors: ErroresPublicacion = {};

  if (data.descripcion.trim() === "") {
    newErrors.descripcion = "La descripción es obligatoria";
  }

  for (const file of data.imagenes) {
    const mensaje = validarArchivoImagen(file);
    if (mensaje) {
      newErrors.imagenes = mensaje;
      break;
    }
  }

  return newErrors;
};
