export interface PatientCardIhlaModel {
  patientId: number;
  patientFio: string;

  ihla?: AnalysisIhla[];
}

export interface AnalysisIhla{
  id?: number
  patientId: number
  result?: string
  analysisDate?: Date
}