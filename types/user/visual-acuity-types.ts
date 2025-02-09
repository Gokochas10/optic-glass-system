// Tipo para los valores de agudeza visual (S/C y C/C)
type VisualAcuityValues = {
    od: string; // Ojo derecho (O.D)
    oi: string; // Ojo izquierdo (O.I)
    j: string;  // J (agudeza visual cercana)
  };
  
  // Tipo para el estado del formulario
  type VisualAcuityFormData = {
    sc: VisualAcuityValues; // Valores sin corrección (S/C)
    cc: VisualAcuityValues; // Valores con corrección (C/C)
  };