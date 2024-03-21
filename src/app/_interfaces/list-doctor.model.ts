export interface ListDoctor{
  list: RowDoctor[]
  maxId: number
  }

export interface RowDoctor{
  id: number
  shortName: string
  longName: string
  doctorCode: string
  doctorSnils: string
}