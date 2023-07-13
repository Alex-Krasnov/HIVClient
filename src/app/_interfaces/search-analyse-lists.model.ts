import { Course } from "./course.model"

export interface  SearchAnalyseListsModel{
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
  listYN?: string[]
  listYNA?: string[]
  listResIb?: string[]
  listArvt?: string[]
  listPNA?: string[]
  listSelectBlot?: string[]
}