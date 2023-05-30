import { Covid } from "./covid.model";
import { SubCovid } from "./sub-covid.model";

export interface PatientCardCovidModel {
  patientId: number;
  patientFio: string;

  listYN?: string[];
  listOutHosp?: string[];
  listClinVarCOVID?: string[];
  listCourseCOVID?: string[];
  listMkb10COVIDShort?: string[];
  listMkb10COVIDLong?: string[];
  listMkbTuderShort?: string[];
  listMkbTuderLong?: string[];
  listMkbPneumoniaShort?: string[];
  listMkbPneumoniaLong?: string[];
  listCommitment?: string[];
  listAvlType?: string[];
  listFullMKB10Short?: string[];
  listFullMKB10Long?: string[];

  covids?: Covid[];
  otherDiags?: SubCovid[];
  patDiags?: SubCovid[];

}