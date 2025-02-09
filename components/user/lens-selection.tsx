import { LensOptions, LensType, ProtectionType } from "@/types/medrecord/lens-options";
import React from "react";

interface LensSelectionProps {
  lensOptions: LensOptions; // Datos de las opciones de lentes
  onLensOptionsChange: (data: LensOptions) => void; // Callback para notificar cambios
  visualizing?: boolean; // Nueva prop para controlar el modo de visualización
}

const LensSelection: React.FC<LensSelectionProps> = ({
  lensOptions,
  onLensOptionsChange,
  visualizing = false, // Valor por defecto: false
}) => {
  // Función para manejar cambios en el tipo de lente
  const handleLensTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (visualizing) return; // No permitir cambios en modo de visualización
    const updatedData = {
      ...lensOptions,
      lensType: event.target.value as LensType,
    };
    onLensOptionsChange(updatedData); // Notificar al padre sobre el cambio
  };

  // Función para manejar cambios en las protecciones
  const handleProtectionChange = (protection: ProtectionType) => {
    if (visualizing) return; // No permitir cambios en modo de visualización
    const isSelected = lensOptions.protections.includes(protection);
    const updatedData = {
      ...lensOptions,
      protections: isSelected
        ? lensOptions.protections.filter((p) => p !== protection) // Desmarcar
        : [...lensOptions.protections, protection], // Marcar
    };
    onLensOptionsChange(updatedData); // Notificar al padre sobre el cambio
  };

  return (
    <div className="space-y-4">
      {/* Selección de tipo de lente */}
      <div>
        <label>Tipo de lente:</label>
        <select
          value={lensOptions.lensType}
          onChange={handleLensTypeChange}
          className="block w-full p-2 border rounded"
          disabled={visualizing} // Deshabilitar en modo de visualización
        >
          <option value="Monofocales">Monofocales</option>
          <option value="Bifocales">Bifocales</option>
          <option value="Progresivos">Progresivos</option>
        </select>
      </div>

      {/* Selección de protecciones */}
      <div>
        <label>Protecciones:</label>
        <div className="space-y-2">
          {(["Blue", "Antireflejo", "Fotocromática", "Blancos"] as ProtectionType[]).map(
            (protection) => (
              <div key={protection}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={lensOptions.protections.includes(protection)}
                    onChange={() => handleProtectionChange(protection)}
                    disabled={visualizing} // Deshabilitar en modo de visualización
                  />
                  <span>{protection}</span>
                </label>
              </div>
            )
          )}
        </div>
      </div>

      {/* Mostrar selección actual */}
      <div>
        <h3>Selección actual:</h3>
        <p>Tipo de lente: {lensOptions.lensType}</p>
        <p>Protecciones: {lensOptions.protections.join(", ") || "Ninguna"}</p>
      </div>
    </div>
  );
};

export default LensSelection;