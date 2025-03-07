import { Validators } from "@angular/forms"
import { BaseSearchModel } from "src/app/base/models/base-search.model"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

@FormModel
export class SearchEpidModel extends BaseSearchModel {

  //#region поля

  @FormField({})
  sex: string = ''

  @FormField({ value: ['Все'], disabled: true })
  blotCheckPlace: string[] = ['Все']

  @FormField({})
  dateDieStart: string = ''

  @FormField({})
  dateDieEnd: string = ''

  @FormField({})
  dateDieAidsStart: string = ''

  @FormField({})
  dateDieAidsEnd: string = ''

  @FormField({ value: ['Все'], disabled: true })
  dieCourse: string[] = ['Все']

  @FormField({ value: 'Все' })
  diePreset: string = ''

  @FormField({ value: ['Все'], disabled: true })
  showIllnes: string[] = ['Все']

  @FormField({})
  dateShowIllnesStart: string = ''

  @FormField({})
  dateShowIllnesEnd: string = ''

  @FormField({})
  ibRes: string = ''

  @FormField({})
  dateIbResStart: string = ''

  @FormField({})
  dateIbResEnd: string = ''

  @FormField({})
  ibNum: string = ''

  @FormField({})
  dateInpIbStart: string = ''

  @FormField({})
  dateInpIbEnd: string = ''

  @FormField({})
  ibSelect: string = ''

  @FormField({ value: ['Все'], disabled: true })
  hospCourse: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  age: string[] = ['Все']
  cardNo: string = ''

  @FormField({ value: ['Все'], disabled: true })
  art: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  mkb10: string[] = ['Все']

  @FormField({ value: 'Все' })
  transfFederYNA: string = ''

  @FormField({})
  dateTransfFederStart: string = ''

  @FormField({})
  dateTransfFederEnd: string = ''

  @FormField({ value: 'Все' })
  ufsinYNA: string = ''

  @FormField({})
  dateUfsinStart: string = ''

  @FormField({})
  dateUfsinEnd: string = ''

  @FormField({})
  aids12: string = ''

  @FormField({})
  epidDescr: string = ''

  @FormField({})
  dtMailRegStart: string = ''

  @FormField({})
  dtMailRegEnd: string = ''

  @FormField({ value: ['Все'], disabled: true })
  education: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  familyStatus: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  employment: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  trans: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  placeCheck: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  situationDetect: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  transmisionMech: string[] = ['Все']

  @FormField({ value: ['Все'], disabled: true })
  vulnerableGroup: string[] = ['Все']

  @FormField({})
  vacName: string = ''

  @FormField({})
  vacDateStart: string = ''

  @FormField({})
  vacDateEnd: string = ''

  @FormField({})
  covidMkb10: string = ''

  @FormField({})
  covidDateStart: string = ''

  @FormField({})
  covidDateEnd: string = ''

  @FormField({ value: 'Все' })
  chemsexYNA: string = ''

  @FormField({})
  chemsexContactType: string = ''

  @FormField({ value: 'Все' })
  pavInjYNA: string = ''

  @FormField({})
  pavInjDateStart: string = ''

  @FormField({})
  pavInjDateEnd: string = ''

  @FormField({ value: 'Все' })
  pavNotInjYNA: string = ''

  @FormField({})
  pavNotInjDateStart: string = ''

  @FormField({})
  pavNotInjDateEnd: string = ''

  @FormField({})
  timeInfectDateStart: string = ''

  @FormField({})
  timeInfectDateEnd: string = ''

  @FormField({ value: ['Все'], disabled: true })
  callstatus: string[] = ['Все']

  @FormField({})
  callDateStart: string = ''

  @FormField({})
  callDateEnd: string = ''

  //#endregion

  //#region select поля

  @FormField({ value: false, validators: [Validators.required] })
  selectSex: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectBlotCheckPlace: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectDieDate: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectDieCourse: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectShowIllnes: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectIb: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectHospCourse: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectAge: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectCardNo: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectArt: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectMkb10: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectUfsin: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectAids12: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectDtMailReg: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectEdu: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectFamilyStatus: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectEmployment: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectTrans: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectTransfFeder: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectPlaceCheck: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectSituationDetect: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectTransmisionMech: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectVulnerableGroup: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectCovidVac: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectCovid: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectChemsex: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectPavInj: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectPavNotInj: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectTimeInfect: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectEpidDescr: boolean = false

  @FormField({ value: false, validators: [Validators.required] })
  selectPatientCall: boolean = false

  //#endregion

  urlSegment(): string {
    return "SearchEpid"
  }
}
