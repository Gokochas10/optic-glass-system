"use server";
import { RecordTypes } from "@/types/user/record-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function editMedicalRecord(medicalRecordId: string, data: RecordTypes) {
  try {
    // Actualizar el MedicalRecord y sus datos relacionados

    const getFirstRefractionId = await prisma.refraction.findFirst({
      where: {
        medicalRecordId: medicalRecordId
      }
    });

    if (getFirstRefractionId) {

      const updatedMedicalRecord = await prisma.medicalRecord.update({
        where: {
          id: medicalRecordId, // ID del registro médico a actualizar
        },
        data: {
          clientId: data.client.id,
          reason: data.reason,
          date: data.date ? new Date(data.date.split('/').reverse().join('-')).toISOString() : new Date().toISOString(), // Convertir la fecha proporcionada de dd/mm/yyyy a ISO
          VisualAcuity: {
            update: {
              data: {
                scOd: data.visualAcuity.sc.od,
                scOi: data.visualAcuity.sc.oi,
                scJ: data.visualAcuity.sc.j,
                ccOd: data.visualAcuity.cc.od,
                ccOi: data.visualAcuity.cc.oi,
                ccJ: data.visualAcuity.cc.j,
              },
            },
          },
          Refraction: {
            update: {
              where: {
                id: getFirstRefractionId.id
              },
              data: {
                rightEyeSphere: parseFloat(data.refraction.rightEye.sphere.toString()),
                rightEyeCylinder: parseFloat(data.refraction.rightEye.cylinder.toString()),
                rightEyeAxis: parseFloat(data.refraction.rightEye.axis.toString()),
                rightEyeAddition: parseFloat(data.refraction.rightEye.addition.toString()),
                rightEyeDnp: parseFloat(data.refraction.rightEye.dnp.toString()),
                rightEyeEyeHeight: parseFloat(data.refraction.rightEye.eyeHeight.toString()),
                leftEyeSphere: parseFloat(data.refraction.leftEye.sphere.toString()),
                leftEyeCylinder: parseFloat(data.refraction.leftEye.cylinder.toString()),
                leftEyeAxis: parseFloat(data.refraction.leftEye.axis.toString()),
                leftEyeAddition: parseFloat(data.refraction.leftEye.addition.toString()),
                leftEyeDnp: parseFloat(data.refraction.leftEye.dnp.toString()),
                leftEyeEyeHeight: parseFloat(data.refraction.leftEye.eyeHeight.toString()),
                notes: data.refraction.notes,
              },
            },
          },
          Autorefractometer: {
            update: {
              data: {
                rightEyeSphere: parseFloat(data.autorefractometer.rightEye.sphere.toString()),
                rightEyeCylinder: parseFloat(data.autorefractometer.rightEye.cylinder.toString()),
                rightEyeAxis: parseFloat(data.autorefractometer.rightEye.axis.toString()),
                leftEyeSphere: parseFloat(data.autorefractometer.leftEye.sphere.toString()),
                leftEyeCylinder: parseFloat(data.autorefractometer.leftEye.cylinder.toString()),
                leftEyeAxis: parseFloat(data.autorefractometer.leftEye.axis.toString()),
              },
            },
          },
          Lensometry: {
            update: {
              data: {
                rightEyeSphere: parseFloat(data.lensometry.rightEye.sphere.toString()),
                rightEyeCylinder: parseFloat(data.lensometry.rightEye.cylinder.toString()),
                rightEyeAxis: parseFloat(data.lensometry.rightEye.axis.toString()),
                leftEyeSphere: parseFloat(data.lensometry.leftEye.sphere.toString()),
                leftEyeCylinder: parseFloat(data.lensometry.leftEye.cylinder.toString()),
                leftEyeAxis: parseFloat(data.lensometry.leftEye.axis.toString()),
              },
            },
          },
          LensOptions: {
            update: {
              data: {
                lensType: data.lensOptions.lensType,
                protections: data.lensOptions.protections,
              },
            },
          },
        },
        include: {
          VisualAcuity: true,
          Refraction: true,
          Autorefractometer: true,
          Lensometry: true,
          LensOptions: true,
        },
      });

      return updatedMedicalRecord;
    }
  } catch (error) {
    console.error("Error actualizando MedicalRecord:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}