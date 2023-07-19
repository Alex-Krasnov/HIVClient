import { Course } from "./course.model"

 export interface  SearchHospModelLists{
   listSex?: string[]
   listRegion?: string[]
   listRegionPreset?: string[]
   listCountry?: string[]
   listStage?: string[]
   listCheckCourse?: Course[]
   listInfectCourse?: string[]
   listLpu?: string[]
   listHospCourse?: string[]
   listHospResult?: string[]
   listYNA?: string[]
}