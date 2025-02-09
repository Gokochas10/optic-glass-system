-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6);

-- CreateTable
CREATE TABLE "Autorefractometer" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "medicalRecordId" TEXT NOT NULL,
    "rightEyeSphere" DOUBLE PRECISION,
    "rightEyeCylinder" DOUBLE PRECISION,
    "rightEyeAxis" DOUBLE PRECISION,
    "leftEyeSphere" DOUBLE PRECISION,
    "leftEyeCylinder" DOUBLE PRECISION,
    "leftEyeAxis" DOUBLE PRECISION,

    CONSTRAINT "Autorefractometer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LensOptions" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "medicalRecordId" TEXT NOT NULL,
    "lensType" TEXT,
    "protections" TEXT[],

    CONSTRAINT "LensOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lensometry" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "medicalRecordId" TEXT NOT NULL,
    "rightEyeSphere" DOUBLE PRECISION,
    "rightEyeCylinder" DOUBLE PRECISION,
    "rightEyeAxis" DOUBLE PRECISION,
    "leftEyeSphere" DOUBLE PRECISION,
    "leftEyeCylinder" DOUBLE PRECISION,
    "leftEyeAxis" DOUBLE PRECISION,

    CONSTRAINT "Lensometry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "clientId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refraction" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "medicalRecordId" TEXT NOT NULL,
    "rightEyeSphere" DOUBLE PRECISION,
    "rightEyeCylinder" DOUBLE PRECISION,
    "rightEyeAxis" DOUBLE PRECISION,
    "rightEyeAddition" DOUBLE PRECISION,
    "rightEyeDnp" DOUBLE PRECISION,
    "rightEyeEyeHeight" DOUBLE PRECISION,
    "leftEyeSphere" DOUBLE PRECISION,
    "leftEyeCylinder" DOUBLE PRECISION,
    "leftEyeAxis" DOUBLE PRECISION,
    "leftEyeAddition" DOUBLE PRECISION,
    "leftEyeDnp" DOUBLE PRECISION,
    "leftEyeEyeHeight" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "Refraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisualAcuity" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "medicalRecordId" TEXT NOT NULL,
    "scOd" TEXT,
    "scOi" TEXT,
    "scJ" TEXT,
    "ccOd" TEXT,
    "ccOi" TEXT,
    "ccJ" TEXT,

    CONSTRAINT "VisualAcuity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Autorefractometer_medicalRecordId_key" ON "Autorefractometer"("medicalRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "LensOptions_medicalRecordId_key" ON "LensOptions"("medicalRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "Lensometry_medicalRecordId_key" ON "Lensometry"("medicalRecordId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecord_clientId_key" ON "MedicalRecord"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "VisualAcuity_medicalRecordId_key" ON "VisualAcuity"("medicalRecordId");

-- AddForeignKey
ALTER TABLE "Autorefractometer" ADD CONSTRAINT "Autorefractometer_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LensOptions" ADD CONSTRAINT "LensOptions_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Lensometry" ADD CONSTRAINT "Lensometry_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Refraction" ADD CONSTRAINT "Refraction_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "VisualAcuity" ADD CONSTRAINT "VisualAcuity_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "MedicalRecord"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
