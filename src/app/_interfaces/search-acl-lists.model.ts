import { Course } from "./course.model"

 export interface  SearchAclListsModel{
    listRegion?: string[]
    listYNA?: string[]
    listStage?: string[]
    listCheckCourse?: Course[]
    listResIb?: string[]
    listSelectBlot?: string[]
    listRegionPreset?: string[]
 }