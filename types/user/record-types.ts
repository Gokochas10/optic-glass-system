import { LensOptions } from "../medrecord/lens-options";
import { RefractionData } from "../medrecord/refraction";
import { AutorefractometerData, LensometryData } from "../medrecord/refractometer";
import { Client } from "./client-types";

export type RecordTypes = {
    client: Client; // Información del cliente
    reason: string; // Motivo de la consulta
    date: string;   // Fecha del reporte
    visualAcuity: VisualAcuityFormData; // Agudeza visual
    refraction: RefractionData; // Datos de refracción
    autorefractometer: AutorefractometerData; // Datos del autorefractómetro
    lensometry: LensometryData; // Datos de lensometría
    lensOptions: LensOptions; // Opciones de lentes y protecciones
  };