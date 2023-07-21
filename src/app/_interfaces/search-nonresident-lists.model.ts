import { Course } from "./course.model"

 export interface  SearchNonresidentModelLists{
    listSex?: string[]
    listRegion?: string[]
    listRegionPreset?: string[]
    listCountry?: string[]
    listStage?: string[]
    listCheckCourse?: Course[]
    listInfectCourse?: string[]
    listShowIllness?: string[]
    listYNA?: string[]
 }