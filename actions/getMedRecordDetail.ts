"use server";
import { db } from "@/lib/db";
import { RecordTypes } from "@/types/user/record-types";

export async function getMedRecordDetail(
  medicalRecordId: string
): Promise<RecordTypes | null> {
  const result = await db.medicalRecord.findUnique({
    where: {
      id: medicalRecordId,
    },
    include: {
      VisualAcuity: true,
      Refraction: true,
      Autorefractometer: true,
      Lensometry: true,
      LensOptions: true,
      Client: true,
    },
  });

  if (!result) {
    return null; // Si no se encuentra el registro, devolver null
  }

  // Mapear los datos de Prisma a la estructura de RecordTypes
  const mappedResult: RecordTypes = {
    client: {
      ...result.Client,
      email: result.Client.email || undefined,
      phone: result.Client.phone || undefined,
      job: result.Client.job || undefined,
      address: result.Client.address || undefined,
    }, // Mapear el cliente
    reason: result.reason, // Motivo de la consulta
    date: result.date.toISOString(), // Convertir la fecha a string
    visualAcuity: {
      sc: {
        od: result.VisualAcuity?.scOd || "",
        oi: result.VisualAcuity?.scOi || "",
        j: result.VisualAcuity?.scJ || "",
      },
      cc: {
        od: result.VisualAcuity?.ccOd || "",
        oi: result.VisualAcuity?.ccOi || "",
        j: result.VisualAcuity?.ccJ || "",
      },
    },
    refraction: {
      rightEye: {
        sphere: result.Refraction[0].rightEyeSphere || 0,
        cylinder: result.Refraction[0].rightEyeCylinder || 0,
        axis: result.Refraction[0].rightEyeAxis || 0,
        addition: result.Refraction[0].rightEyeAddition || 0,
        dnp: result.Refraction[0].rightEyeDnp || 0,
        eyeHeight: result.Refraction[0].rightEyeEyeHeight || 0,
      },
      leftEye: {
        sphere: result.Refraction[0].leftEyeSphere || 0,
        cylinder: result.Refraction[0].leftEyeCylinder || 0,
        axis: result.Refraction[0].leftEyeAxis || 0,
        addition: result.Refraction[0].leftEyeAddition || 0,
        dnp: result.Refraction[0].leftEyeDnp || 0,
        eyeHeight: result.Refraction[0].leftEyeEyeHeight || 0,
      },
      notes: result.Refraction[0].notes || "",
    },
    autorefractometer: {
      rightEye: {
        sphere: result.Autorefractometer?.rightEyeSphere || 0,
        cylinder: result.Autorefractometer?.rightEyeCylinder || 0,
        axis: result.Autorefractometer?.rightEyeAxis || 0,
      },
      leftEye: {
        sphere: result.Autorefractometer?.leftEyeSphere || 0,
        cylinder: result.Autorefractometer?.leftEyeCylinder || 0,
        axis: result.Autorefractometer?.leftEyeAxis || 0,
      },
    },
    lensometry: {
      rightEye: {
        sphere: result.Lensometry?.rightEyeSphere || 0,
        cylinder: result.Lensometry?.rightEyeCylinder || 0,
        axis: result.Lensometry?.rightEyeAxis || 0,
      },
      leftEye: {
        sphere: result.Lensometry?.leftEyeSphere || 0,
        cylinder: result.Lensometry?.leftEyeCylinder || 0,
        axis: result.Lensometry?.leftEyeAxis || 0,
      },
    },
    lensOptions: {
      lensType: result.LensOptions?.lensType as "Monofocales" | "Bifocales" | "Progresivos",
      protections: result.LensOptions?.protections as ("Blue" | "Antireflejo" | "Fotocromática" | "Blancos")[] || [],
      
    },
  };

  return mappedResult;
}
