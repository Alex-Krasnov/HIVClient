import { CorrespIllnesses } from "./corresp-illnesses.model";
import { CureSchemas } from "./cure-schemas.model";
import { HepC } from "./hep-c.model";
import { HospResultRs } from "./hosp-result-rs.model";

export interface PatientCardTreatmentModel {
  patientId: number;
  patientFio: string;
  stageName: string;
  stageCom: string;
  patientCom: string;
  invalidName: string;
  hepBdate: Date;
  hepBDescr: string;

  listInvalids?: string[];
  listCorrespIllness?: string[];
  listCureSchemas?: string[];
  listCureChanges?: string[];
  listRangeTherapy?: string[];
  listLpus?: string[];
  listHospCourses?: string[];
  listHospResults?: string[];

  correspIllnesses?: CorrespIllnesses[]; 
  cureSchemas?: CureSchemas[];
  hospResultRs?: HospResultRs[];
  hepCs?: HepC[];
}