import { Diag3Col } from "./diag3-col.model";


export interface PatientCardDiagnosticManualModel {
  patientId: number;
  patientFio: string;

  listVLResult?: string[];
  listHCResult?: string[];
  listHBResult?: string[];

  virusLoads?: Diag3Col[];
  hepCs?: Diag3Col[];
  hepBs?: Diag3Col[];
}