import { Course } from "./course.model"

 export interface  SearchPregnantListsModel{
    listRegion?: string[]
    listCountry?: string[]
    listYNA?: string[]
    listStage?: string[]
    listCheckCourse?: Course[]
    listInfectCourse?: string[]
    listShowIllness?: string[]
    listPregCheck?: string[]
    listBirthType?: string[]
    listSchema?: string[]
    listMedecineForSchema?: string[]
    listMaterHome?: string[]
    listArvt?: string[]
    listDiePreset?: string[]
    listRegionPreset?: string[]
 }