"use client"
import { RecordTypes } from "@/types/user/record-types";
import React from "react";
import { Alert } from "../ui/alert";
import { CalendarForm } from "../date-picker";
import ClientDataFill from "./client-data-fill";
import ReasonMedRecord from "./reason-med-record";
import VisualAcuityForm from "./visual-acuity-form";
import RefractionDataTable from "./refraction-data-table";
import RefractionCard from "./refraction-card";
import LensSelection from "./lens-selection";

interface VisualizeMedicalRecordProps {
  medicalRecord: RecordTypes;
}

const VisualizeMedicalRecord: React.FC<VisualizeMedicalRecordProps> = ({medicalRecord}) => {
  return (
    <div className="w-full max-w-[1200px]">
      <Alert>
        <h1 className="flex justify-center mb-4 text-4xl">Registro Médico de {medicalRecord.client.fullName}</h1>
        <CalendarForm date={new Date(medicalRecord.date)} onDateChange={()=>{}} />
        <ClientDataFill
          clientData={medicalRecord.client}
          onClientData={()=>{}}
          title={"Buscar el cliente"}
          key={1}
          visualizing={true}
        />
        <ReasonMedRecord 
          reason={medicalRecord.reason}
          onReasonChange={()=>{}}
          visualizing={true}
        />
        <VisualAcuityForm
          visualAcuity={medicalRecord.visualAcuity}
          onVisualAcuityChange={()=>{}}
          visualizing={true}
        />
        <RefractionDataTable
          refraction={medicalRecord.refraction}
          onRefractionChange={()=>{}}
          visualizing={true}
        />
        <RefractionCard
          autorefractometer={medicalRecord.autorefractometer}
          onAutorefractometerChange={()=>{}}
          lensometry={medicalRecord.lensometry}
          onLensometryChange={()=>{}}
          visualizing={true}
        />
        <LensSelection
          lensOptions={medicalRecord.lensOptions}
          onLensOptionsChange={()=>{}}
          visualizing={true}
        />
      </Alert>
    </div>
  );
};

export default VisualizeMedicalRecord;
