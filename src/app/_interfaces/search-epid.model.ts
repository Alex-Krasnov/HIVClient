 export interface  SearchEpidModel{
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
   unRegCourse?: string 
   blotCheckPlace?: string[]
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
   age?: string[]
   cardNo?: string 
   art?: string[] 
   mkb10?: string[] 
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
   snilsYNA?: string 
   snils?: string 
   epidDescr?: string 

   dtMailRegStart?: string
   dtMailRegEnd?: string
   education?: string[]
   familyStatus?: string[]
   employment?: string[]
   trans?: string[]
   placeCheck?: string[]
   situationDetect?: string[]
   transmisionMech?: string[]
   vulnerableGroup?: string[]
   vacName?: string
   vacDateStart?: string
   vacDateEnd?: string
   covidMkb10?: string
   covidDateStart?: string
   covidDateEnd?: string
   chemsexYNA?: string
   chemsexContactType?: string
   pavInjYNA?: string
   pavInjDateStart?: string
   pavInjDateEnd?: string
   pavNotInjYNA?: string
   pavNotInjDateStart?: string
   pavNotInjDateEnd?: string
   timeInfectDateStart?: string
   timeInfectDateEnd?: string
  
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
   selectTransfArea: boolean
   selectFr: boolean
   selectTransfFeder: boolean
   selectUfsin: boolean
   selectAids12: boolean
   
   selectDtMailReg: boolean
   selectEdu: boolean
   selectFamilyStatus: boolean
   selectEmployment: boolean
   selectTrans: boolean
   selectPlaceCheck: boolean
   selectSituationDetect: boolean
   selectTransmisionMech: boolean
   selectVulnerableGroup: boolean
   selectCovidVac: boolean
   selectCovid: boolean
   selectChemsex: boolean
   selectPavInj: boolean
   selectPavNotInj: boolean
   selectTimeInfect: boolean
   selectUnrz: boolean
   selectSnils: boolean
   selectEpidDescr: boolean
   
   page: number
   excel: boolean
 }