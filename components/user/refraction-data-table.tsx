import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { RefractionData } from "@/types/medrecord/refraction";

interface RefractionDataTableProps {
  refraction: RefractionData; // Datos de refracción
  onRefractionChange: (data: RefractionData) => void; // Callback para notificar cambios
  visualizing?: boolean; // Nueva prop para controlar el modo de visualización
}

const RefractionDataTable: React.FC<RefractionDataTableProps> = ({
  refraction,
  onRefractionChange,
  visualizing = false, // Valor por defecto: false
}) => {
  // Función para manejar cambios en los inputs
  const handleInputChange = (
    field: string, // Campo a actualizar
    value: string, // Nuevo valor
    eye?: "rightEye" | "leftEye" // Ojo a actualizar (opcional)
  ) => {
    if (visualizing) return; // No permitir cambios en modo de visualización
    const updatedData = { ...refraction };

    if (eye) {
      // Actualizar el ojo correspondiente
      updatedData[eye] = {
        ...updatedData[eye],
        [field]: value,
      };
    } else {
      // Actualizar las notas
      updatedData.notes = value;
    }

    onRefractionChange(updatedData); // Notificar al padre sobre el cambio
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ojo</TableHead>
            <TableHead>Esfera</TableHead>
            <TableHead>Cilindro</TableHead>
            <TableHead>Eje</TableHead>
            <TableHead>Adición</TableHead>
            <TableHead>DNP</TableHead>
            <TableHead>Altura del Ojo</TableHead>
            <TableHead>Notas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Fila para el ojo derecho */}
          <TableRow>
            <TableCell>Ojo Derecho</TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.rightEye.sphere}
                onChange={(e) => handleInputChange("sphere", e.target.value, "rightEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.rightEye.cylinder}
                onChange={(e) => handleInputChange("cylinder", e.target.value, "rightEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.rightEye.axis}
                onChange={(e) => handleInputChange("axis", e.target.value, "rightEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.rightEye.addition}
                onChange={(e) => handleInputChange("addition", e.target.value, "rightEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.rightEye.dnp}
                onChange={(e) => handleInputChange("dnp", e.target.value, "rightEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.rightEye.eyeHeight}
                onChange={(e) => handleInputChange("eyeHeight", e.target.value, "rightEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell rowSpan={2}>
              <Input
                value={refraction.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
          </TableRow>
          {/* Fila para el ojo izquierdo */}
          <TableRow>
            <TableCell>Ojo Izquierdo</TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.leftEye.sphere}
                onChange={(e) => handleInputChange("sphere", e.target.value, "leftEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.leftEye.cylinder}
                onChange={(e) => handleInputChange("cylinder", e.target.value, "leftEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.leftEye.axis}
                onChange={(e) => handleInputChange("axis", e.target.value, "leftEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.leftEye.addition}
                onChange={(e) => handleInputChange("addition", e.target.value, "leftEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.leftEye.dnp}
                onChange={(e) => handleInputChange("dnp", e.target.value, "leftEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                value={refraction.leftEye.eyeHeight}
                onChange={(e) => handleInputChange("eyeHeight", e.target.value, "leftEye")}
                disabled={visualizing} // Deshabilitar en modo de visualización
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default RefractionDataTable;