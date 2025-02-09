import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AutorefractometerData, LensometryData } from "@/types/medrecord/refractometer";

interface RefractionCardProps {
  autorefractometer: AutorefractometerData; // Datos del autorefractómetro
  onAutorefractometerChange: (data: AutorefractometerData) => void; // Callback para notificar cambios
  lensometry: LensometryData; // Datos de la lensometría
  onLensometryChange: (data: LensometryData) => void; // Callback para notificar cambios
  visualizing?: boolean; // Nueva prop para controlar el modo de visualización
}

const RefractionCard:React.FC<RefractionCardProps> = (
  {autorefractometer, onAutorefractometerChange, lensometry, onLensometryChange, visualizing = false}
  
) => {
  
  // Función para manejar cambios en los inputs del autorefractómetro
  const handleAutorefractometerChange = (
    field: string, // Campo a actualizar
    value: number, // Nuevo valor
    eye: "rightEye" | "leftEye" // Ojo a actualizar
  ) => {
    if (visualizing) return; // No permitir cambios en modo de visualización
    const updatedData = { ...autorefractometer };
    updatedData[eye] = {
      ...updatedData[eye],
      [field]: value,
    };
    onAutorefractometerChange(updatedData); // Notificar al padre sobre el cambio
  };

  // Función para manejar cambios en los inputs de la lensometría
  const handleLensometryChange = (
    field: string, // Campo a actualizar
    value: number, // Nuevo valor
    eye: "rightEye" | "leftEye" // Ojo a actualizar
  ) => {
    const updatedData = { ...lensometry };
    updatedData[eye] = {
      ...updatedData[eye],
      [field]: value,
    };
    onLensometryChange(updatedData); // Notificar al padre sobre el cambio
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 mt-5">
      {/* Card para el Autorefractómetro */}
      <Card>
        <CardHeader>
          <CardTitle>Autorefractómetro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Ojo derecho */}
            <div>
              <Label>Ojo Derecho</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Esfera"
                  value={autorefractometer.rightEye.sphere}
                  onChange={(e) =>
                    handleAutorefractometerChange("sphere", parseFloat(e.target.value), "rightEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
                <Input
                  type="number"
                  placeholder="Cilindro"
                  value={autorefractometer.rightEye.cylinder}
                  onChange={(e) =>
                    handleAutorefractometerChange("cylinder", parseFloat(e.target.value), "rightEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
                <Input
                  type="number"
                  placeholder="Eje"
                  value={autorefractometer.rightEye.axis}
                  onChange={(e) =>
                    handleAutorefractometerChange("axis", parseFloat(e.target.value), "rightEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
              </div>
            </div>
            {/* Ojo izquierdo */}
            <div>
              <Label>Ojo Izquierdo</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Esfera"
                  value={autorefractometer.leftEye.sphere}
                  onChange={(e) =>
                    handleAutorefractometerChange("sphere", parseFloat(e.target.value), "leftEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
                <Input
                  type="number"
                  placeholder="Cilindro"
                  value={autorefractometer.leftEye.cylinder}
                  onChange={(e) =>
                    handleAutorefractometerChange("cylinder", parseFloat(e.target.value), "leftEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
                <Input
                  type="number"
                  placeholder="Eje"
                  value={autorefractometer.leftEye.axis}
                  onChange={(e) =>
                    handleAutorefractometerChange("axis", parseFloat(e.target.value), "leftEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card para la Lensometría */}
      <Card>
        <CardHeader>
          <CardTitle>Lensometría</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Ojo derecho */}
            <div>
              <Label>Ojo Derecho</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Esfera"
                  value={lensometry.rightEye.sphere}
                  onChange={(e) =>
                    handleLensometryChange("sphere", parseFloat(e.target.value), "rightEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
                <Input
                  type="number"
                  placeholder="Cilindro"
                  value={lensometry.rightEye.cylinder}
                  onChange={(e) =>
                    handleLensometryChange("cylinder", parseFloat(e.target.value), "rightEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
                <Input
                  type="number"
                  placeholder="Eje"
                  value={lensometry.rightEye.axis}
                  onChange={(e) =>
                    handleLensometryChange("axis", parseFloat(e.target.value), "rightEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
              </div>
            </div>
            {/* Ojo izquierdo */}
            <div>
              <Label>Ojo Izquierdo</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Esfera"
                  value={lensometry.leftEye.sphere}
                  onChange={(e) =>
                    handleLensometryChange("sphere", parseFloat(e.target.value), "leftEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
                <Input
                  type="number"
                  placeholder="Cilindro"
                  value={lensometry.leftEye.cylinder}
                  onChange={(e) =>
                    handleLensometryChange("cylinder", parseFloat(e.target.value), "leftEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
                <Input
                  type="number"
                  placeholder="Eje"
                  value={lensometry.leftEye.axis}
                  onChange={(e) =>
                    handleLensometryChange("axis", parseFloat(e.target.value), "leftEye")
                  }
                  disabled={visualizing} // Deshabilitar en modo de visualización
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefractionCard;