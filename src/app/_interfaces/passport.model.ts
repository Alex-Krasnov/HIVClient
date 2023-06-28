
 export interface  PassportModel{
  patientId: number
  region?: string
  locationName?: string
  cityName?: string
  index?: string
  addrStreat?: string
  addrHouse?: string
  addrExt?: string
  addrFlat?: string
  regionFact?: string
  cityNameFact?: string
  locationNameFact?: string
  indexFact?: string
  addrStreatFact?: string
  addrExtFact?: string
  addrHouseFact?: string
  addrFlatFact?: string
  dtRegBeg?: Date
  dtRegEnd?: Date   
  pasSer?: string
  pasNum?: string
  pasWhen?: Date
  pasWhom?: string
  omsSer?: string
  omsNum?: string
  omsWhen?: Date

  listRegion?: string[];
 }