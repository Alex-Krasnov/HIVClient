import { PatientCheck } from "./patient-check.model";
import { Registry } from "./registry.model";

export interface PatientCardVisitModel {
  patientId: number;
  patientFio: string;

  listSpec?: string[];
  listDoctor?: string[];
  listCab?: string[];
  listRegTime?: string[];

  checks?: PatientCheck[];
  checksOut?: PatientCheck[];
  registries?: Registry[];
}