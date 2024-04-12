import { Chemsex } from "./chemsex.model";
import { Contact } from "./contact.model";
import { CovidEpid } from "./covid-epid.model";
import { CovidVacEpid } from "./covid-vac-epid.model";
import { EpidChild } from "./epid-child.model";
import { PatientCall } from "./patient-call.model";
import { Pav } from "./pav.model";

export interface PatientCardEpidModel {
  patientId: number;
  patientFio: string;
  dtMailReg?: Date;
  eduName?: string;
  employmentName?: string;
  epidDocName?: string;
  epidTimeInfectEnd?: Date;
  epidTimeInfectStart?: Date;
  epidemCom?: string;
  familyStatusName?: string;
  numMail?: number;
  situationDetectName?: string;
  transName?: string;
  transmitionMechName?: string;
  maxIdEpidChil: number;
  maxIdCall: number;

  listCovidMKB?: string[];
  listEdu?: string[];
  listEmloyment?: string[];
  listEpidDoc?: string[];
  listFamilyStatus?: string[];
  listSituationDetect?: string[];
  listTrans?: string[];
  listTransmitionMech?: string[];
  listTypeContacts?: string[];
  listVac?: string[];
  listYn?: string[];
  listSex?: string[];
  listCallStatus?: string[];

  chemsex?: Chemsex[]; 
  constantContact?: Contact[];
  randomContact?: Contact[];
  otherContact?: Contact[];
  pavInj?: Pav[];
  pavNotInj?: Pav[];
  covidVac?: CovidVacEpid[];
  covid?: CovidEpid[];
  callStatuses?: PatientCall[];
  epidChild?: EpidChild[];
}