export interface List3Col{
  list: Row3Col[]
  maxId: number
  }

export interface Row3Col{
  id: number
  longName: string
  isActive: boolean
}