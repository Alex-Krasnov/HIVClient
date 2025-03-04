import { FormGroup, Validators } from "@angular/forms"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

@FormModel
export abstract class BaseSearchModel {
  form: FormGroup;

  //#region Общие поля

  // Адрес
  @FormField({})
  city: string = ''
  @FormField({})
  location: string = ''
  @FormField({})
  indx: string = ''
  @FormField({})
  street: string = ''
  @FormField({})
  home: string = ''

  // Дата рождения
  @FormField({})
  birthDateStart: string = ''
  @FormField({})
  birthDateEnd: string = ''

  // Причина обращения
  @FormField({ value: ['Все'], disabled: true })
  checkCourse: string[] = ['Все']

  // Страна
  @FormField({ value: ['Все'], disabled: true })
  country: string[] = ['Все']

  // ФИО
  @FormField({})
  familyName: string = ''
  @FormField({})
  firstName: string = ''
  @FormField({})
  thirdName: string = ''

  // ФР / Зав. АПО
  @FormField({ value: 'Все' })
  frYNA: string = 'Все'
  @FormField({ value: 'Все' })
  zavApoYNA: string = 'Все'

  // Фактор риска заражения
  @FormField({ value: ['Все'], disabled: true })
  infectCourse: string[] = ['Все']

  // Дата ввода
  @FormField({})
  dateInpStart: string = ''
  @FormField({})
  dateInpEnd: string = ''

  // ИД пациента
  @FormField({})
  patientId: string = ''

  // Регион (рег.)
  @FormField({ value: ['Все'], disabled: true })
  regionReg: string[] = ['Все']
  @FormField({ value: 'Все' })
  regionPreset: string = 'Все'

  // Регион (факт.)
  @FormField({ value: ['Все'], disabled: true })
  regionFact: string[] = ['Все']
  @FormField({ value: 'Все' })
  factRegionPreset: string = 'Все'

  // Дата пост.на учёт / снят.с учёта
  @FormField({})
  dateRegOnStart: string = ''
  @FormField({})
  dateRegOnEnd: string = ''
  @FormField({})
  dateUnRegStart: string = ''
  @FormField({})
  dateUnRegEnd: string = ''
  @FormField({})
  unRegCourse: string = ''

  // СНИЛС
  @FormField({ value: 'Все' })
  snilsYNA: string = 'Все'
  @FormField({})
  snils: string = ''

  // Стадия
  @FormField({ value: ['Все'], disabled: true })
  stage: string[] = ['Все']

  // Передан в район
  @FormField({ value: 'Все' })
  transfAreaYNA: string = 'Все'
  @FormField({})
  dateTransfAreaStart: string = ''
  @FormField({})
  dateTransfAreaEnd: string = ''

  // УНРЗ
  @FormField({ value: 'Все' })
  unrzYNA: string = 'Все'
  @FormField({})
  unrz: string = ''

  page: number = 1
  excel: boolean = false

  //#endregion

  //#region Общие select поля

  @FormField({ value: true, validators: [Validators.required] })
  selectFio: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectBirthDate: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectAddr: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectCheckCourse: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectCountry: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectFr: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectInfectCourse: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectInpDate: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectPatientId: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectRegion: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectRegionFact: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectRegOnDate: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectSnils: boolean = true

  @FormField({ value: false, validators: [Validators.required] })
  selectStage: boolean = false

  @FormField({ value: true, validators: [Validators.required] })
  selectTransfArea: boolean = true

  @FormField({ value: true, validators: [Validators.required] })
  selectUnrz: boolean = true

  //#endregion

  /**Название контролера поиска*/
  abstract urlSegment(): string

  /** Метод для установки значений по умолчанию */
  setDefaultValues() {
    this.form.patchValue({
      //#region Общие поля

      city: '',
      location: '',
      indx: '',
      street: '',
      home: '',
      birthDateStart: '',
      birthDateEnd: '',
      checkCourse: ['Все'],
      country: ['Все'],
      familyName: '',
      firstName: '',
      thirdName: '',
      frYNA: 'Все',
      zavApoYNA: 'Все',
      infectCourse: ['Все'],
      dateInpStart: '',
      dateInpEnd: '',
      patientId: '',
      regionReg: ['Все'],
      regionPreset: 'Все',
      regionFact: ['Все'],
      factRegionPreset: 'Все',
      dateRegOnStart: '',
      dateRegOnEnd: '',
      dateUnRegStart: '',
      dateUnRegEnd: '',
      unRegCourse: '',
      snilsYNA: 'Все',
      snils: '',
      stage: ['Все'],
      transfAreaYNA: 'Все',
      dateTransfAreaStart: '',
      dateTransfAreaEnd: '',
      unrzYNA: 'Все',
      unrz: '',

      //#endregion

      //#region Общие select поля

      selectFio: false,
      selectBirthDate: false,
      selectAddr: false,
      selectCheckCourse: false,
      selectCountry: false,
      selectFr: false,
      selectInfectCourse: false,
      selectInpDate: false,
      selectPatientId: false,
      selectRegion: false,
      selectRegionFact: false,
      selectRegOnDate: false,
      selectSnils: false,
      selectStage: false,
      selectTransfArea: false,
      selectUnrz: false

      //#endregion
    });
  }
}