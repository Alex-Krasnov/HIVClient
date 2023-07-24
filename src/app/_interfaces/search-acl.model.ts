 export interface SearchAclModel{
    dateInpStart?: string 
    dateInpEnd?: string 
    patientId?: string 
    familyName?: string 
    firstName?: string 
    thirdName?: string 
    sex?:string
    birthDateStart?: string 
    birthDateEnd?: string 
    regionReg?: string[] 
    regionPreset?: string 
    regionFact?: string[]
    factRegionPreset?: string 
    dateRegOnStart?: string 
    dateRegOnEnd?: string 
    dateUnRegStart?: string 
    dateUnRegEnd?: string 
    stage?: string[]
    checkCourse?: string[]
    ibRes?: string 
    dateIbResStart?: string 
    dateIbResEnd?: string 
    ibNum?: string 
    dateInpIbStart?: string 
    dateInpIbEnd?: string 
    ibSelect?: string 
    
    aclTestCode1?: string 
    aclTestCode2?: string 
    aclTestCode3?: string 
    aclTestCode4?: string 
    aclTestCode5?: string 
    aclTestCode6?: string 
    aclTestCode7?: string 
    biochemistry?: boolean 
    hematology?: boolean 
    aclSampleDateStart?: string 
    aclSampleDateEnd?: string 
    

    selectInpDate: boolean
    selectPatientId: boolean
    selectFio: boolean
    selectSex: boolean
    selectBirthDate: boolean
    selectRegion: boolean
    selectRegionFact: boolean
    selectRegOnDate: boolean
    selectStage: boolean
    selectCheckCourse: boolean
    selectIb: boolean
    selectTestCode: boolean
    selectSampleDate: boolean
    
    
    page: number
    excel: boolean
 }