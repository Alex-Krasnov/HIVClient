import { Resistence } from "./resistence.model";

export interface PatientCardResistenceModel {
  patientId: number;
  patientFio: string;

  resistences?: Resistence[];
}