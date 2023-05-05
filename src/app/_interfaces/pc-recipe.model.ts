 export interface pcRecipe{
    patientId: number
    ser: string
    num: string
    prescrDate: Date
    doctor?: String
    medicine?: String
    packNum?: String
    finSource?: String
    giveDate?: Date
    giveDateCheck?: boolean
    medicineGive?: String
    packNumGive?: String
    serOld?: string
    numOld?: string
  }