import { Course } from "./course.model"

 export interface  SearchVisitModelLists{
    listSex?: string[]
    listRegion?: string[]
    listCountry?: string[]
    listStage?: string[]
    listCheckCourse?: Course[]
    listInfectCourse?: string[]
    listShowIllness?: string[]
    listYNA?: string[]
    listDoctor?: string[]
    listArvt?: string[]
    listRegionPreset?: string[]
 }