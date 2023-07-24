 export interface SearchHospModel{
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
    city?: string 
    location?: string 
    indx?: string 
    street?: string 
    home?: string 
    dateRegOnStart?: string 
    dateRegOnEnd?: string 
    dateUnRegStart?: string 
    dateUnRegEnd?: string 
    stage?: string[]
    checkCourse?: string[]
    infectCourse?: string[]
    transfAreaYNA?: string 
    dateTransfAreaStart?: string 
    dateTransfAreaEnd?: string 
    ufsinYNA?: string 
    dateUfsinStart?: string 
    dateUfsinEnd?: string 
    frYNA?: string 
    zavApoYNA?: string 
    
    dateHospInStart?: string 
    dateHospInEnd?: string 
    dateHospOutStart?: string 
    dateHospOutEnd?: string 
    lpu?: string[]
    hospCourse?: string[]
    hospResult?: string[]


    selectInpDate: boolean
    selectPatientId: boolean
    selectFio: boolean
    selectSex: boolean
    selectBirthDate: boolean
    selectRegion: boolean
    selectRegionFact: boolean
    selectCountry: boolean
    selectAddr: Boolean
    selectRegOnDate: boolean
    selectStage: boolean
    selectCheckCourse: boolean
    selectInfectCourse: boolean
    selectTransfArea: boolean
    selectFr: boolean
    selectUfsin: boolean
    
    selectDateHospIn: boolean
    selectDateHospOut: boolean
    selectLpu: boolean
    selectHospCourse: boolean
    selectHospResult: boolean
    

    page: number
    excel: boolean
 }