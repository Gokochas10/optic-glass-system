"use client";

import { createMedicalRecord } from "@/actions/sendMedReport";
import { CalendarForm } from "@/components/date-picker";
import { Alert } from "@/components/ui/alert";
import ClientDataFill from "@/components/user/client-data-fill";
import LensSelection from "@/components/user/lens-selection";
import ReasonMedRecord from "@/components/user/reason-med-record";
import RefractionCard from "@/components/user/refraction-card";
import RefractionDataTable from "@/components/user/refraction-data-table";
import VisualAcuityForm from "@/components/user/visual-acuity-form";
import { LensOptions } from "@/types/medrecord/lens-options";
import { RefractionData } from "@/types/medrecord/refraction";
import { AutorefractometerData, LensometryData } from "@/types/medrecord/refractometer";
import { Client } from "@/types/user/client-types";
import { RecordTypes } from "@/types/user/record-types";
import React, { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MedRecordPage = () => {
  // Estados para cada sección del formulario
  const [clientData, setClientData] = useState<Client>();
  const [date, setDate] = useState<Date>(new Date());
  const [reason, setReason] = useState("");
  const [visualAcuity, setVisualAcuity] = useState({ sc: { od: "", oi: "", j: "" }, cc: { od: "", oi: "", j: "" } });
  const [refraction, setRefraction] = useState({
    rightEye: { sphere: 0, cylinder: 0, axis: 0, addition: 0, dnp: 0, eyeHeight: 0 },
    leftEye: { sphere: 0, cylinder: 0, axis: 0, addition: 0, dnp: 0, eyeHeight: 0 },
    notes: "",
  });
  const [autorefractometer, setAutorefractometer] = useState({ rightEye: { sphere: 0, cylinder: 0, axis: 0 }, leftEye: { sphere: 0, cylinder: 0, axis: 0 } });
  const [lensometry, setLensometry] = useState({ rightEye: { sphere: 0, cylinder: 0, axis: 0 }, leftEye: { sphere: 0, cylinder: 0, axis: 0 } });
  const [lensOptions, setLensOptions] = useState<LensOptions>({ lensType: "Monofocales", protections: [] });
  const [isLoading, setIsLoading] = useState(false);

  // Callback para actualizar los datos del cliente
  const handleClientData = (data: Client) => {
    setClientData(data);
  };

  // Callback para actualizar la razón
  const handleReasonChange = (data: string) => {
    setReason(data);
  };

  // Callback para actualizar la agudeza visual
  const handleVisualAcuityChange = (data: any) => {
    setVisualAcuity(data);
  };

  // Callback para actualizar la refracción
  const handleRefractionChange = (data: RefractionData) => {
    setRefraction(data);
  };

  // Callback para actualizar el autorefractómetro
  const handleAutorefractometerChange = (data: AutorefractometerData) => {
    setAutorefractometer(data);
  };

  // Callback para actualizar la lensometría
  const handleLensometryChange = (data: LensometryData) => {
    setLensometry(data);
  };

  // Callback para actualizar las opciones de lentes
  const handleLensOptionsChange = (data: LensOptions) => {
    setLensOptions(data);
  };

  // Función para enviar el formulario completo
  const handleSubmit = async () => {
    if (!clientData) {
      alert("Por favor, selecciona un cliente.");
      return;
    }

    setIsLoading(true);

    const recordData: RecordTypes = {
      client: clientData,
      reason: reason, // Puedes agregar un campo para el motivo
      date: date?.toISOString() || new Date().toISOString(),
      visualAcuity,
      refraction,
      autorefractometer,
      lensometry,
      lensOptions,
    };

    try {
      await createMedicalRecord(recordData);
      toast.success("Registro médico creado exitosamente.");
      setClientData(undefined);
      setDate(new Date());
      setReason("");
      setVisualAcuity({ sc: { od: "", oi: "", j: "" }, cc: { od: "", oi: "", j: "" } });
      setRefraction({
        rightEye: { sphere: 0, cylinder: 0, axis: 0, addition: 0, dnp: 0, eyeHeight: 0 },
        leftEye: { sphere: 0, cylinder: 0, axis: 0, addition: 0, dnp: 0, eyeHeight: 0 },
        notes: "",
      });
      setAutorefractometer({ rightEye: { sphere: 0, cylinder: 0, axis: 0 }, leftEye: { sphere: 0, cylinder: 0, axis: 0 } });
      setLensometry({ rightEye: { sphere: 0, cylinder: 0, axis: 0 }, leftEye: { sphere: 0, cylinder: 0, axis: 0 } });
      setLensOptions({ lensType: "Monofocales" as const, protections: [] });

    } catch (error) {
      toast.error("Hubo un error al crear el registro médico.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px]">
      <Alert>
        <h1 className="flex justify-center mb-4 text-4xl">Nuevo Registro Médico</h1>
        <CalendarForm date={date} onDateChange={setDate} />
        <ClientDataFill
          clientData={clientData}
          onClientData={handleClientData}
          title={"Buscar el cliente"}
          key={1}
        />
        <ReasonMedRecord
          reason={reason}
          onReasonChange={handleReasonChange}
        />
        <VisualAcuityForm
          visualAcuity={visualAcuity}
          onVisualAcuityChange={handleVisualAcuityChange}
        />
        <RefractionDataTable
          refraction={refraction}
          onRefractionChange={handleRefractionChange}
        />
        <RefractionCard
          autorefractometer={autorefractometer}
          onAutorefractometerChange={handleAutorefractometerChange}
          lensometry={lensometry}
          onLensometryChange={handleLensometryChange}
        />
        <LensSelection
          lensOptions={lensOptions}
          onLensOptionsChange={handleLensOptionsChange}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`mt-4 p-2 text-white rounded h-10 w-full flex items-center justify-center ${isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando Registro Médico...
            </>
          ) : (
            'Guardar Registro Médico'
          )}
        </button>
      </Alert>
    </div>
  );
};

export default MedRecordPage;