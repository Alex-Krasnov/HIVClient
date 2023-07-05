import { Course } from "./course.model"

 export interface  SearchChildListsModel{
   listRegion?: string[]
   listRegionPreset?: string[]
   listCountry?: string[]
   listRegOff?: string[]
   listStage?: string[]
   listCheckCourse?: Course[]
   listInfectCourse?: string[]
   listShowIllness?: string[]
   listCodeMKB10?: string[]
   listFamilyType?: string[]
   listChildPlace?: string[]
   listPhp?: string[]
   listSex?: string[]
   listArvt?: string[]
   listMaterhome?: string[]
   listYN?: string[]
   listYNA?: string[]
 }