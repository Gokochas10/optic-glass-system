"use server";

import { db } from "@/lib/db";

export const getMedRecord = async (clientId: string) => {
  const clientMedRecord = await db.medicalRecord.findMany({
    where: {
      clientId,
    },
  });

  return clientMedRecord;
};
