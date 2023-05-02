import { CMV } from "./cmv.model";
import { IHL } from "./ihl.model";
import { ImStatCD348 } from "./im-stat-cd348.model";
import { ImStat } from "./im-stat.model";
import { VirusLoadQual } from "./virus-load-qual.model";
import { VirusLoad } from "./virus-load.model";


export interface PatientCardDiagnosticsModel {
  patientId: number;
  patientFio: string;

  virusLoads?: VirusLoad[];
  virusLoadsQuals?: VirusLoadQual[]; 
  cmVs?: CMV[];
  imStats?: ImStat[];
  imStatCD348s: ImStatCD348[];
  ihLs: IHL[];
}