 export interface SearchNonresidentModel{
    dateInpStart?: string 
    dateInpEnd?: string 
    patientId?: string 
    familyName?: string 
    firstName?: string 
    thirdName?: string 
    sex?: string 
    birthDateStart?: string 
    birthDateEnd?: string 
    regionReg?: string[] 
    regionPreset?: string 
    regionFact?: string[]
    factRegionPreset?: string 
    country?: string[]
    dateRegOnStart?: string 
    dateRegOnEnd?: string 
    dateUnRegStart?: string 
    dateUnRegEnd?: string 
    stage?: string[]
    stageDateStart?: string 
    stageDateEnd?: string 
    checkCourse?: string[]
    infectCourse?: string[]
    showIllnes?: string[]
    dateShowIllnesStart?: string 
    dateShowIllnesEnd?: string 
    transfAreaYNA?: string 
    dateTransfAreaStart?: string 
    dateTransfAreaEnd?: string 
    ufsinYNA?: string 
    dateUfsinStart?: string 
    dateUfsinEnd?: string 
    frYNA?: string 
    zavApoYNA?: string 
    
    dateDiagnosisStart?: string 
    dateDiagnosisEnd?: string 
    placeDiagnosis?: string[] 
    dateRegistrationYNA?: string 
    dateRegistrationStart?: string 
    dateRegistrationEnd?: string 
    dateDepartureYNA?: string 
    dateDepartureStart?: string 
    dateDepartureEnd?: string 


    selectInpDate: boolean
    selectPatientId: boolean
    selectFio: boolean
    selectSex: boolean
    selectBirthDate: boolean
    selectRegion: boolean
    selectRegionFact: boolean
    selectCountry: boolean
    selectRegOnDate: boolean
    selectStage: boolean
    selectCheckCourse: boolean
    selectInfectCourse: boolean
    selectShowIllnes: boolean
    selectTransfArea: boolean
    selectFr: boolean
    selectUfsin: boolean
    
    selectDateDiagnosis: boolean
    selectPlaceDiagnosis: boolean
    selectDateRegistration: boolean
    selectDateDeparture: boolean
    selectAddr: boolean

    page: number
 }