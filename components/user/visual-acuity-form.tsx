import React from "react";
import { Input } from "../ui/input";

interface VisualAcuityFormProps {
  visualAcuity: VisualAcuityFormData;
  onVisualAcuityChange: (data: VisualAcuityFormData) => void;
  visualizing?: boolean; // Nueva prop para controlar el modo de visualización
}

const VisualAcuityForm: React.FC<VisualAcuityFormProps> = ({
  visualAcuity,
  onVisualAcuityChange,
  visualizing = false, // Valor por defecto: false
}) => {
  // Función para manejar cambios en los inputs
  const handleInputChange = (
    section: "sc" | "cc", // Sección (S/C o C/C)
    field: keyof VisualAcuityValues, // Campo (od, oi, j)
    value: string // Valor ingresado
  ) => {
    if (visualizing) return; // No permitir cambios en modo de visualización
    const updatedData = {
      ...visualAcuity,
      [section]: {
        ...visualAcuity[section],
        [field]: value,
      },
    };
    onVisualAcuityChange(updatedData);
  };

  return (
    <div className="visual-acuity-form flex gap-4 mt-5 mb-5">
      {/* Sección S/C (sin corrección) */}
      <div className="left-side flex-1">
        <h3 className="mb-3">S/C</h3>
        <div className="mb-3">
          <label>O.D</label>
          <Input
            type="text"
            name="sc_od"
            value={visualAcuity.sc.od}
            onChange={(e) => handleInputChange("sc", "od", e.target.value)}
            disabled={visualizing} // Deshabilitar en modo de visualización
          />
        </div>
        <div className="mb-3">
          <label>O.I</label>
          <Input
            type="text"
            name="sc_oi"
            value={visualAcuity.sc.oi}
            onChange={(e) => handleInputChange("sc", "oi", e.target.value)}
            disabled={visualizing} // Deshabilitar en modo de visualización
          />
        </div>
        <div className="mb-3">
          <label>J</label>
          <Input
            type="text"
            name="sc_j"
            value={visualAcuity.sc.j}
            onChange={(e) => handleInputChange("sc", "j", e.target.value)}
            disabled={visualizing} // Deshabilitar en modo de visualización
          />
        </div>
      </div>

      {/* Sección C/C (con corrección) */}
      <div className="right-side flex-1">
        <h3 className="mb-3">C/C</h3>
        <div className="mb-3">
          <label>O.D</label>
          <Input
            type="text"
            name="cc_od"
            value={visualAcuity.cc.od}
            onChange={(e) => handleInputChange("cc", "od", e.target.value)}
            disabled={visualizing} // Deshabilitar en modo de visualización
          />
        </div>
        <div className="mb-3">
          <label>O.I</label>
          <Input
            type="text"
            name="cc_oi"
            value={visualAcuity.cc.oi}
            onChange={(e) => handleInputChange("cc", "oi", e.target.value)}
            disabled={visualizing} // Deshabilitar en modo de visualización
          />
        </div>
        <div className="mb-3">
          <label>J</label>
          <Input
            type="text"
            name="cc_j"
            value={visualAcuity.cc.j}
            onChange={(e) => handleInputChange("cc", "j", e.target.value)}
            disabled={visualizing} // Deshabilitar en modo de visualización
          />
        </div>
      </div>
    </div>
  );
};

export default VisualAcuityForm;