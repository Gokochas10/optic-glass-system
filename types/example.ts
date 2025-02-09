import { RecordTypes } from "./user/record-types";

export const medicalRecord: RecordTypes = {
    client: {
      id: "d234ff57-cc4d-4275-a698-a2a4191cd2eb",
      fullName: "Juan Pérez",
      email: "juan@example.com",
      age: 30,
      phone: "555-1234",
      job: "Ingeniero",
      address: "Calle Falsa 123",

    },
    reason: "Consulta de rutina",
    date: "2023-10-15",
    visualAcuity: {
      sc: { od: "20/20", oi: "20/25", j: "20/20" },
      cc: { od: "20/15", oi: "20/20", j: "20/15" },
    },
    refraction: {
      rightEye: {
        sphere: -1.25,
        cylinder: -0.75,
        axis: 180,
        addition: 1.5,
        dnp: 32,
        eyeHeight: 14,
      },
      leftEye: {
        sphere: -1.5,
        cylinder: -0.5,
        axis: 170,
        addition: 1.5,
        dnp: 32,
        eyeHeight: 14,
      },
      notes: "Paciente con miopía leve.",
    },
    autorefractometer: {
      rightEye: { sphere: -1.25, cylinder: -0.75, axis: 180 },
      leftEye: { sphere: -1.5, cylinder: -0.5, axis: 170 },
    },
    lensometry: {
      rightEye: { sphere: -1.25, cylinder: -0.75, axis: 180 },
      leftEye: { sphere: -1.5, cylinder: -0.5, axis: 170 },
    },
    lensOptions: {
      lensType: "Progresivos",
      protections: ["Blue", "Antireflejo"],
    },
  };
