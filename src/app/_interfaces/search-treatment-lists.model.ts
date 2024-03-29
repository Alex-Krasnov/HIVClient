import { Course } from "./course.model"

export interface  SearchTreatmentListsModel{
  listSex?: string[]
  listRegion?: string[]
  listRegionPreset?: string[]
  listCountry?: string[]
  listRegOff?: string[]
  listStage?: string[]
  listDieCourse?: string[]
  listDiePreset?: string[]
  listCheckCourse?: Course[]
  listInfectCourse?: string[]
  listShowIllness?: string[]
  listInvalid?: string[]
  listCorrespIllness?: string[]
  listSchema?: string[]
  listSchemaMedecine?: string[]
  listMedecine?: string[]
  listDoctor?: string[]
  listSchemaChange?: string[]
  listFinSourse?: string[]
  listArvt?: string[]
  listRangeTherapy?: string[]
  listYN?: string[]
  listYNA?: string[]
  listResIb?: string[]
  listSelectBlot?: string[]
}