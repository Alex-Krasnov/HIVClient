 export interface  SearchMainInfModel{
    dateInpStart?: string 
    dateInpEnd?: string 
    patientId?: string 
    familyName?: string 
    firstName?: string 
    thirdName?: string 
    fioChange?: string 
    sex?: string 
    birthDateStart?: string 
    birthDateEnd?: string 
    regionReg?: string[] 
    regionFact?: string[]
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
    unRegCourse?: string 
    blotCheckPlace?: string[]
    stage?: string[]
    dateDieStart?: string 
    dateDieEnd?: string 
    dateDieAidsStart?: string 
    dateDieAidsEnd?: string 
    checkCourse?: string[]
    dieCourse?: string[]
    infectCourse?: string[]
    showIllnes?: string[]
    dateShowIllnesStart?: string 
    dateShowIllnesEnd?: string 
    ibRes?: string 
    dateIbResStart?: string 
    dateIbResEnd?: string 
    ibNum?: string 
    dateInpIbStart?: string 
    dateInpIbEnd?: string 
    ibSelect?: string 
    hospCourse?: string[]
    age?: string[]
    cardNo?: string 
    art?: string 
    mkb10?: string 
    archiveYNA?: string 
    archive?: string 
    transfAreaYNA?: string 
    dateTransfAreaStart?: string 
    dateTransfAreaEnd?: string 
    frYNA?: string 
    zavApoYNA?: string 
    transfFederYNA?: string 
    dateTransfFederStart?: string 
    dateTransfFederEnd?: string 
    ufsinYNA?: string 
    dateUfsinStart?: string 
    dateUfsinEnd?: string 
    aids12?: string 
    unrzYNA?: string 
    unrz?: string 
    dieDiagYNA?: string 
    chemprof?: string 
    dateChemprofStartStart?: string 
    dateChemprofStartEnd?: string 
    dateChemprofEndStart?: string 
    dateChemprofEndEnd?: string 
    dateRegStart?: string 
    dateRegEnd?: string 
    diePreset?: string 
    regionPreset?: string 
    factRegionPreset?: string 
  
    selectInpDate: boolean
    selectPatientId: boolean
    selectFio: boolean
    selectSex: boolean
    selectBirthDate: boolean
    selectRegion: boolean
    selectRegionFact: boolean
    selectCountry: boolean
    selectAddr: boolean
    selectRegOnDate: boolean
    selectBlotCheckPlace: boolean
    selectStage: boolean
    selectDieDate: boolean
    selectCheckCourse: boolean
    selectDieCourse: boolean
    selectInfectCourse: boolean
    selectShowIllnes: boolean
    selectIb: boolean
    selectHospCourse: boolean
    selectAge: boolean
    selectCardNo: boolean
    selectArt: boolean
    selectMkb10: boolean
    selectArchive: boolean
    selectTransfArea: boolean
    selectFr: boolean
    selectTransfFeder: boolean
    selectUfsin: boolean
    selectAids12: boolean
    selectUnrz: boolean
    selectChemprof: boolean
    selectDieDiag: boolean
    selectDateReg: boolean
    selectPasSer: boolean
    selectPasNum: boolean
    selectPasWhom: boolean
    selectPasWhen: boolean
    
    page: number
    excel: boolean
 }