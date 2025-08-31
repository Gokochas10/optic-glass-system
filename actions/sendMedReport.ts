"use server"
import { RecordTypes } from "@/types/user/record-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMedicalRecord(data: RecordTypes) {
  try {
    console.log("🔄 Iniciando creación de registro médico para cliente:", data.client.id);

    // Verificar si existe el cliente en glass_store.Client
    const existingClient = await prisma.client.findUnique({
      where: { id: data.client.id }
    });

    if (!existingClient) {
      console.log("⚠️ Cliente no encontrado en glass_store.Client, creando con campos mínimos...");

      // Verificar si ya existe un cliente con el mismo email
      let emailToUse = data.client.email;
      if (emailToUse) {
        const existingEmailClient = await prisma.client.findUnique({
          where: { email: emailToUse }
        });

        if (existingEmailClient && existingEmailClient.id !== data.client.id) {
          console.log("⚠️ Email ya existe en otro cliente, usando email temporal...");
          // Usar un email temporal para evitar conflictos
          emailToUse = `${data.client.id}@temp.glassstore.com`;
        }
      }

      // Usar upsert para manejar el caso donde el email ya existe
      await prisma.client.upsert({
        where: { id: data.client.id },
        update: {
          // Si ya existe, actualizar con los datos del cliente
          fullName: data.client.fullName,
          age: data.client.age || 0,
          email: emailToUse,
          phone: data.client.phone || null,
          job: data.client.job || null,
          address: data.client.address || null,
        },
        create: {
          // Si no existe, crear con los datos del cliente
          id: data.client.id,
          fullName: data.client.fullName,
          age: data.client.age || 0,
          email: emailToUse,
          phone: data.client.phone || null,
          job: data.client.job || null,
          address: data.client.address || null,
        }
      });

      console.log("✅ Cliente creado/actualizado en glass_store.Client con ID:", data.client.id);
    } else {
      console.log("✅ Cliente encontrado en glass_store.Client");
    }

    // Crear el MedicalRecord y sus datos relacionados
    const medicalRecord = await prisma.medicalRecord.create({
      data: {
        clientId: data.client.id,
        reason: data.reason,
        date: data.date ? new Date(data.date.split('/').reverse().join('-')).toISOString() : new Date().toISOString(), // Convertir la fecha proporcionada de dd/mm/yyyy a ISO
        VisualAcuity: {
          create: {
            scOd: data.visualAcuity.sc.od,
            scOi: data.visualAcuity.sc.oi,
            scJ: data.visualAcuity.sc.j,
            ccOd: data.visualAcuity.cc.od,
            ccOi: data.visualAcuity.cc.oi,
            ccJ: data.visualAcuity.cc.j,
          },
        },
        Refraction: {
          create: {
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
        Autorefractometer: {
          create: {
            rightEyeSphere: parseFloat(data.autorefractometer.rightEye.sphere.toString()),
            rightEyeCylinder: parseFloat(data.autorefractometer.rightEye.cylinder.toString()),
            rightEyeAxis: parseFloat(data.autorefractometer.rightEye.axis.toString()),
            leftEyeSphere: parseFloat(data.autorefractometer.leftEye.sphere.toString()),
            leftEyeCylinder: parseFloat(data.autorefractometer.leftEye.cylinder.toString()),
            leftEyeAxis: parseFloat(data.autorefractometer.leftEye.axis.toString()),
          },
        },
        Lensometry: {
          create: {
            rightEyeSphere: parseFloat(data.lensometry.rightEye.sphere.toString()),
            rightEyeCylinder: parseFloat(data.lensometry.rightEye.cylinder.toString()),
            rightEyeAxis: parseFloat(data.lensometry.rightEye.axis.toString()),
            leftEyeSphere: parseFloat(data.lensometry.leftEye.sphere.toString()),
            leftEyeCylinder: parseFloat(data.lensometry.leftEye.cylinder.toString()),
            leftEyeAxis: parseFloat(data.lensometry.leftEye.axis.toString()),
          },
        },
        LensOptions: {
          create: {
            lensType: data.lensOptions.lensType,
            protections: data.lensOptions.protections,
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

    console.log("✅ MedicalRecord creado exitosamente:", medicalRecord.id);
    return medicalRecord;
  } catch (error) {
    console.error("❌ Error creando MedicalRecord:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}