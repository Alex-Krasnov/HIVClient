import { Jail } from "./jail.model";

export interface PatientCardJailModel {
  patientId: number;
  patientFio: string;
  jailName?: string;
  jailOffRegion?: string;
  jailOffDate?: Date;

  listJail?: string[];
  listRegion?: string[];

  jails?: Jail[];
}