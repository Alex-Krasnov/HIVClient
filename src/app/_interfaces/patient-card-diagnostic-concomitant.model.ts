import { Diag3Col } from "./diag3-col.model";
import { Diag2Col } from "./diag2-col.model";
import { HepCPcr } from "./hep-c-pcr.model";

export interface PatientCardDiagnosticConcomitantModel {
  patientId: number;
  patientFio: string;

  hepBPcrs?: Diag3Col[];
  vpchs?: Diag3Col[];
  hepCIfas?: Diag2Col[];
  hepBIfas?: Diag2Col[];
  siphilisIfas?: Diag2Col[];
  toxIggs?: Diag2Col[];
  toxIgms?: Diag2Col[];
  hepCPcrs?: HepCPcr[];
}