// Tipos de lentes (solo uno)
export type LensType = "Monofocales" | "Bifocales" | "Progresivos";

// Tipos de protecciones (pueden ser varios)
export type ProtectionType = "Blue" | "Antireflejo" | "Fotocromática" | "Blancos";

// Tipo para representar las opciones de lentes y protecciones
export type LensOptions = {
  lensType: LensType; // Solo un tipo de lente
  protections: ProtectionType[]; // Múltiples protecciones
};