
import { Calendar } from "./calendar"
import { TimeList } from "./time-list"

export interface ShareDataRegVisit{
    patientId: number
    docId: number
    cabId: number
    date: Date
    calendars: Calendar[]
    regTimes: TimeList[]
  }