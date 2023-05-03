import { BhGe } from "./bh-ge.model copy";

export interface PatientCardAclModel {
  patientId: number;
  patientFio: string;

  bhs?: BhGe[];
  ges?: BhGe[];
}