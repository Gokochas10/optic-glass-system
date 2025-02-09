export type RefractionData = {
    rightEye: {
      sphere: number,       // Esfera (número)
      cylinder: number,     // Cilindro (número)
      axis: number,         // Eje (número)
      addition: number,     // Adición (número)
      dnp: number,          // DNP (número)
      eyeHeight: number,    // Altura del ojo (número)
    },
    leftEye: {
      sphere: number,       // Esfera (número)
      cylinder: number,     // Cilindro (número)
      axis: number,         // Eje (número)
      addition: number,     // Adición (número)
      dnp: number,          // DNP (número)
      eyeHeight: number,    // Altura del ojo (número)
    },
    notes: string,          // Notas adicionales (texto)
  };