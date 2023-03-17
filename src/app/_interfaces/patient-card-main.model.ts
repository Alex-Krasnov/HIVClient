import { Blot } from "./blot.model";
import { Stage } from "./stage.model";
import { SecondDeseases } from "./second-deseases.model";

export interface PatientCardMainModel {
  patientId: number;
  inputDate?: Date;
  familyName?: string;
  firstName?: string;
  thirdName?: string;
  birthDate?: Date;
  sex?: string;
  regOnDate?: Date;
  regOffDate?: Date;
  regOffReason?: string;
  unrzFr?: string;
  region?: string;
  cityName?: string;
  locationName?: string;
  phone?: string;
  addrStreat?: string;
  addrExt?: string;
  addrHouse?: string;
  addrFlat?: string;
  regionFact?: string;
  cityNameFact?: string;
  locationNameFact?: string;
  indexFact?: string;
  addrStreatFact?: string;
  addrExtFact?: string;
  addrHouseFact?: string;
  addrFlatFact?: string;
  dtRegBeg?: Date;
  dtRefEnd?: Date;
  country?: string;
  comm?: string;
  heightOld?:number;
  weightOld?:number;
  placeCheck?: string;
  codeMKB10?: string;
  checkCourseShort?: string;
  checkCourseLong?: string;
  infectCourseShort?: string;
  infectCourseLong?: string;
  dieCourseShort?: string;
  dieCourseLong?: string;
  cardNo?: string;
  vulnerableGroup?: string;
  regOn: boolean;
  headPhysician: boolean;
  zamMedPart: boolean;
  transfArea: boolean;
  transfAreaDate?: Date;
  transfFederDate?: Date;
  ufsinDate?: Date;
  dieInputDate?: Date;
  dieDate?: Date;
  dieAidsDate?: Date;
  fioChange?: string;
  snils?: string;
  arvt?: string;
  invalid?: string;
  archive?: string;
  codeWord?: string;

  listSex?: string[];
  listRegOffReason?: string[];
  listRegion?: string[];
  listCountry?: string[];
  listPlaceCheck?: string[];
  listCodeMKB?: string[];
  listCheckCourseShort?: string[];
  listCheckCourseLong?: string[];
  listInfectCourseShort?: string[];
  listInfectCourseLong?: string[];
  listDieCourseShort?: string[];
  listDieCourseLong?: string[];
  listVulnerableGroup?: string[];
  listARVT?: string[];
  listInvalid?: string[];
  listCheckPlace?: string[];
  listRes?: string[];
  listDesease?: string[];
  listStage?: string[];

  blots?: Blot[]; 
  secondDeseases?: SecondDeseases[];
  stages?: Stage[];
}