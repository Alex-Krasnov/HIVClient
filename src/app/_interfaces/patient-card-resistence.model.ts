import { Resistence } from "./resistence.model copy";

export interface PatientCardResistenceModel {
  patientId: number;
  patientFio: string;

  resistences?: Resistence[];
}