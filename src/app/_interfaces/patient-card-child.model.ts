export interface PatientCardChildModel {
  patientId: number;
  patientFio: string;
  familyType?: string;
  mId?: number;
  mFio?: string;
  fId?: number;
  fFio?: string;
  firstCheckDate?: Date;
  childPlace?: string;
  breastMonth?: number;
  childPhp?: string;
  materHome?: string;
  childDescr?: string;
  growth?: number;
  weight?: number;
  forma309?: string;
  lastCareDate?: Date;
  communicationParentDate?: Date;
  callingDistrictSpecDate?: Date;
  refusalPhp: boolean;
  refusalResearch: boolean;
  refusalTherapy: boolean;

  listFamilyType?: string[];
  listChildPlace?: string[];
  listChildPhp?: string[];
  listMaterHome?: string[];
  listForm309?: string[];
}