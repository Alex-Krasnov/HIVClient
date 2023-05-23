import { PregM } from "./preg-m.model";

export interface PatientCardPregnantModel {
  patientId: number;
  patientFio: string;
  pregCheck?: string;
  pregMonth?: number;

  listPregCheck?: string[];
  listBirthType?: string[];
  listChildCount?: string[];

  pregnantMs?: PregM[];
}