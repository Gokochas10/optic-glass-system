/*
  Warnings:

  - A unique constraint covering the columns `[medicalRecordId]` on the table `Refraction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Refraction_medicalRecordId_key" ON "Refraction"("medicalRecordId");
