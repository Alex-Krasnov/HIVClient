import { BaseSearchModel } from "../../base/models/base-search.model"

export class SearchMainInfModel extends BaseSearchModel{

   //#region поля

   fioChange: string = ''
   sex:  string = ''
   blotCheckPlace: string[] = ['Все']
   dateDieStart:  string = ''
   dateDieEnd:  string = ''
   dateDieAidsStart:  string = ''
   dateDieAidsEnd:  string = ''
   dieCourse: string[] = ['Все']
   showIllnes: string[] = ['Все']
   dateShowIllnesStart:  string = ''
   dateShowIllnesEnd:  string = ''
   ibRes:  string = ''
   dateIbResStart:  string = ''
   dateIbResEnd:  string = ''
   ibNum:  string = ''
   dateInpIbStart:  string = ''
   dateInpIbEnd:  string = ''
   ibSelect:  string = ''
   referenceMO:  string = ''
   hospCourse: string[] = ['Все']
   age: string[] = ['Все']
   cardNo:  string = ''
   art:  string = ''
   mkb10:  string = ''
   archiveYNA:  string = ''
   archive:  string = ''
   transfFederYNA:  string = ''
   dateTransfFederStart:  string = ''
   dateTransfFederEnd:  string = ''
   ufsinYNA:  string = ''
   dateUfsinStart:  string = ''
   dateUfsinEnd:  string = ''
   aids12:  string = ''
   dieDiagYNA:  string = ''
   chemprof:  string = ''
   dateChemprofStartStart:  string = ''
   dateChemprofStartEnd:  string = ''
   dateChemprofEndStart:  string = ''
   dateChemprofEndEnd:  string = ''
   dateRegStart:  string = ''
   dateRegEnd:  string = ''
   diePreset:  string = ''
   
  //#endregion

   //#region select поля

   selectSex: boolean = false
   selectBlotCheckPlace: boolean = false
   selectDieDate: boolean = false
   selectDieCourse: boolean = false
   selectShowIllnes: boolean = false
   selectIb: boolean = false
   selectHospCourse: boolean = false
   selectAge: boolean = false
   selectCardNo: boolean = false
   selectArt: boolean = false
   selectMkb10: boolean = false
   selectArchive: boolean = false
   selectTransfFeder: boolean = false
   selectUfsin: boolean = false
   selectAids12: boolean = false
   selectChemprof: boolean = false
   selectDieDiag: boolean = false
   selectDateReg: boolean = false
   selectPasSer: boolean = false
   selectPasNum: boolean = false
   selectPasWhom: boolean = false
   selectPasWhen: boolean = false
   
   //#endregion

   urlSegment(): string {
      return "SearchMainInf"
   }
}