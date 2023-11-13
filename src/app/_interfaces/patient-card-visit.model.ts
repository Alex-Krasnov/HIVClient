import { PatientCheck } from "./patient-check.model";
import { Registry } from "./registry.model";

export interface PatientCardVisitModel {
  patientId: number;
  patientFio: string;

  listSpec?: string[];
  listDoctor?: string[];
  listCab?: string[];
  listRegTime?: string[];

  checksOut?: PatientCheck[];
  registries?: Registry[];
}