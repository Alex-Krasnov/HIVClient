import { Diag3Col } from "./diag3-col.model";
import { Diag2Col } from "./diag2-col.model";
import { ImStatCD348 } from "./im-stat-cd348.model";
import { ImStat } from "./im-stat.model";


export interface PatientCardDiagnosticsModel {
  patientId: number;
  patientFio: string;

  virusLoads?: Diag3Col[];
  virusLoadsQuals?: Diag2Col[]; 
  cmVs?: Diag3Col[];
  imStats?: ImStat[];
  imStatCD348s: ImStatCD348[];
  ihLs: Diag2Col[];
}