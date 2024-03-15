export interface List2Col{
  list: Row2Col[]
  maxId: number
  }

export interface Row2Col{
  id: number
  shortName?: string
  longName: string
}