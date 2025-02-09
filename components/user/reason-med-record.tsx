"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ReasonMedRecordProps {
  reason: string; // Motivo de la consulta
  onReasonChange: (reason: string) => void; // Callback para notificar cambios
  visualizing?: boolean; // Nueva prop para controlar el modo de visualización
}

const ReasonMedRecord: React.FC<ReasonMedRecordProps> = ({
  reason,
  onReasonChange,
  visualizing = false, // Valor por defecto: false
}) => {
  // Función para manejar cambios en el textarea
  const handleReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (visualizing) return; // No permitir cambios en modo de visualización
    const newReason = e.target.value;
    if (newReason.length <= 1000) { 
      onReasonChange(newReason);
    }
  };

  return (
    <div className="space-y-2 mb-5">
      <Label htmlFor="reason">Motivo de la consulta</Label>
      <Textarea
        id="reason"
        value={reason}
        onChange={handleReasonChange}
        placeholder="Ingrese el motivo de la consulta (entre 50 y 250 caracteres)"
        className="min-h-[100px] resize-y" // Altura mínima y permitir redimensionar verticalmente
        disabled={visualizing} // Deshabilitar en modo de visualización
      />
      <p className="text-sm text-muted-foreground">
        {reason.length}/1000 caracteres
      </p>
    </div>
  );
};

export default ReasonMedRecord;