 export abstract class BaseSearchModel{

  //#region Общие поля

  // Адрес
  city: string = ''
  location: string = ''
  indx: string = ''
  street: string = ''
  home: string = ''

  // Дата рождения
  birthDateStart: string = ''
  birthDateEnd: string = ''

  // Причина обращения
  checkCourse: string[] = ['Все']

  // Страна
  country: string[] = ['Все']

  // ФИО
  familyName: string = ''
  firstName: string = ''
  thirdName: string = ''

  // ФР / Зав. АПО
  frYNA: string = 'Все'
  zavApoYNA: string = 'Все'

  // Фактор риска заражения
  infectCourse: string[] = ['Все']

  // Дата ввода
  dateInpStart: string = ''
  dateInpEnd: string = ''

  // ИД пациента
  patientId: string = ''

  // Регион (рег.)
  regionReg: string[] = ['Все'] 
  regionPreset: string = 'Все'

  // Регион (факт.)
  regionFact: string[] = ['Все']
  factRegionPreset: string = 'Все'

  // Дата пост.на учёт / снят.с учёта
  dateRegOnStart: string = ''
  dateRegOnEnd: string = ''
  dateUnRegStart: string = ''
  dateUnRegEnd: string = ''
  unRegCourse: string = ''

  // СНИЛС
  snilsYNA: string = 'Все'
  snils: string = ''

  // Стадия
  stage: string[] = ['Все']

  // Передан в район
  transfAreaYNA: string = 'Все'
  dateTransfAreaStart: string = ''
  dateTransfAreaEnd: string = ''

  // УНРЗ
  unrzYNA: string = 'Все'
  unrz: string = ''
    
  page: number = 1
  excel: boolean = false

  //#endregion

  //#region Общие select поля

  selectFio: boolean = false
  selectBirthDate: boolean = false
  selectAddr: boolean = false
  selectCheckCourse: boolean = false
  selectCountry: boolean = false
  selectFr: boolean = false
  selectInfectCourse: boolean = false
  selectInpDate: boolean = false
  selectPatientId: boolean = false
  selectRegion: boolean = false
  selectRegionFact: boolean = false
  selectRegOnDate: boolean = false
  selectSnils: boolean = false
  selectStage: boolean = false
  selectTransfArea: boolean = false
  selectUnrz: boolean = false

  //#endregion

  /**Название контролера поиска*/
  abstract urlSegment(): string
}