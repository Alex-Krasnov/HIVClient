import { CorrespIllnesses } from "./corresp-illnesses.model";
import { CureSchemas } from "./cure-schemas.model";
import { HospResultRs } from "./hosp-result-rs.model";

export interface PatientCardTreatmentModel {
  patientId: number;
  patientFio: string;
  stageName: string;
  stageCom: string;
  patientCom: string;
  invalidName: string;

  ListInvalids?: string[];
  ListCorrespIllness?: string[];
  ListCureSchemas?: string[];
  ListCureChanges?: string[];
  ListRangeTherapy?: string[];
  ListLpus?: string[];
  ListHospCourses?: string[];
  ListHospResults?: string[];

  correspIllnesses?: CorrespIllnesses[]; 
  cureSchemas?: CureSchemas[];
  hospResultRs?: HospResultRs[];
}