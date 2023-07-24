 export interface SearchVisitModel{
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

    regDateStart?: string 
    regDateEnd?: string 
    checkDateStart?: string 
    checkDateEnd?: string 
    doctor?: string[]
    cardNo?: string 
    art?: string[]
    regCheck?: string 


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

    selectRegDate: boolean
    selectCheckDate: boolean
    selectDoctor: boolean
    selectCardNo: boolean
    selectArt: boolean
    selectAddr: boolean
    selectRegCheck: boolean

    page: number
    excel: boolean
 }