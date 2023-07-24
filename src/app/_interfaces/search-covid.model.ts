 export interface  SearchCovidModel{
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
  regionPreset?: string 
  regionFact?: string[]
  factRegionPreset?: string 
  country?: string[]
  dateRegOnStart?: string 
  dateRegOnEnd?: string 
  dateUnRegStart?: string 
  dateUnRegEnd?: string 
  unRegCourse?: string 
  stage?: string[]
  dateDieStart?: string 
  dateDieEnd?: string 
  dateDieAidsStart?: string 
  dateDieAidsEnd?: string 
  checkCourse?: string[]
  dieCourse?: string[]
  diePreset?: string 
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
  art?: string[] 
  mkb10?: string[] 

  mkb10Covid?: string[] 
  mkb10Tuber?: string[] 
  mkb10Pneumonia?: string[] 
  hospCovid?: string[] 
  clinVarCovid?: string[] 
  courseCovid?: string[] 
  arterHyperYn?: string
  diabetesYn?: string
  coronarySyndYn?: string
  hoblYn?: string
  bronhAstmaYn?: string
  cancerYn?: string
  kidneyDesYn?: string
  outpatTreatYn?: string
  deathCovidYn?: string
  oritYn?: string
  oxygenYn?: string
  typeAlvYn?: string
  periodDesStart?: string
  periodDesEnd?: string
  positivResCovidStart?: string
  positivResCovidEnd?: string
  negativeResCovidStart?: string
  negativeResCovidEnd?: string
  hospitalizationStart?: string
  hospitalizationEnd?: string
  dischargeStart?: string
  dischargeEnd?: string

  
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
  selectDieDate: boolean
  selectCheckCourse: boolean
  selectDieCourse: boolean
  selectInfectCourse: boolean
  selectShowIllnes: boolean
  selectIb: boolean
  selectHospCourse: boolean
  selectArt: boolean
  selectMkb10: boolean

  selectMkb10Covid: boolean
  selectMkb10Tuber: boolean
  selectMkb10Pneumonia: boolean
  selectHospCovid: boolean
  selectClinVarCovid: boolean
  selectCourseCovid: boolean
  selectArterHyper: boolean
  selectDiabetes: boolean
  selectCoronarySynd: boolean
  selectHobl: boolean
  selectBronhAstma: boolean
  selectCancer: boolean
  selectKidneyDes: boolean
  selectOutpatTreat: boolean
  selectDeathCovid: boolean
  selectOrit: boolean
  selectOxygen: boolean
  selectTypeAlv: boolean
  selectPeriodDes: boolean
  selectPositivResCovid: boolean
  selectNegativeResCovid: boolean
  selectHospitalization: boolean
  selectDischarge: boolean
   
  page: number
 }