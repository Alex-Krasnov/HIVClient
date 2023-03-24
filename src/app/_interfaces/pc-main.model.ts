 export interface pcMain{
  patientId: number
  familyName?: string
  firstName?: string
  thirdName?: string
  sexId?: string
  birthDate?: string
  regOnDate?: string
  regOffDate?: string
  regOffReason?: string
  unrzFr1?: string

  regionId?: string
  cityName?: string
  locationName?: string
  addrIndPhone?: string
  addrStreet?: string
  addrHouse?: string
  addrExt?: string
  addrFlat?: string

  factRegionId?: string
  factCityName?: string
  factLocationName?: string
  factAddrInd?: string
  factAddrStreet?: string
  factAddrHouse?: string
  factAddrExt?: string
  factAddrFlat?: string
  dtRegBeg?: string
  dtRegEnd?: string

  addrNameComm?: string
  countryId?: string

  placeCheckId?: string
  codeMkb10Id?: string
  cardNo?: string
  vulnerableGroupId?: string
  heightOld?: number
  weightOld?: number
  flgZamMedPart?: boolean
  flgHeadPhysician?: boolean

  checkCourseId?: string
  infectCourseId?: string
  dieCourseId?: string

  transfAreaDate?: string
  transfFederDate?: string
  ufsinDate?: string
  dieDate?: string
  dieAidsDate?: string
  arvtId?: string
  invalidId?: string
  snilsFedArchive?: string
  codeword?: string
  snils?: string
  fioChange?: string
  }