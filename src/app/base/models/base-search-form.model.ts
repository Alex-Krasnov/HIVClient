import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class BaseSearchForm {
  form: FormGroup

  constructor(protected listService: ListService) {
    this.form = new FormGroup({
      //#region Общие поля

      city: new FormControl(''),
      location: new FormControl(''),
      indx: new FormControl(''),
      street: new FormControl(''),
      home: new FormControl(''),
      birthDateStart: new FormControl(''),
      birthDateEnd: new FormControl(''),
      checkCourse: new FormControl({ value: ['Все'], disabled: true }),
      country: new FormControl({ value: ['Все'], disabled: true }),
      familyName: new FormControl(''),
      firstName: new FormControl(''),
      thirdName: new FormControl(''),
      frYNA: new FormControl('Все', [], InList.validateYNA(this.listService)),
      zavApoYNA: new FormControl('Все', [], InList.validateYNA(this.listService)),
      infectCourse: new FormControl({ value: ['Все'], disabled: true }),
      dateInpStart: new FormControl(''),
      dateInpEnd: new FormControl(''),
      patientId: new FormControl(''),
      regionReg: new FormControl({ value: ['Все'], disabled: true }),
      regionPreset: new FormControl('Все'),
      regionFact: new FormControl({ value: ['Все'], disabled: true }),
      factRegionPreset: new FormControl('Все'),
      dateRegOnStart: new FormControl(''),
      dateRegOnEnd: new FormControl(''),
      dateUnRegStart: new FormControl(''),
      dateUnRegEnd: new FormControl(''),
      unRegCourse: new FormControl('', [], InList.validateInfectCourseLong(this.listService)),
      snilsYNA: new FormControl('Все', [], InList.validateYNA(this.listService)),
      snils: new FormControl(''),
      stage: new FormControl({ value: ['Все'], disabled: true }),
      transfAreaYNA: new FormControl('Все', [], InList.validateYNA(this.listService)),
      dateTransfAreaStart: new FormControl(''),
      dateTransfAreaEnd: new FormControl(''),
      unrzYNA: new FormControl('Все', [], InList.validateYNA(this.listService)),
      unrz: new FormControl(''),

      //#endregion

      //#region Общие select поля

      selectFio: new FormControl(false, Validators.required),
      selectBirthDate: new FormControl(false, Validators.required),
      selectAddr: new FormControl(false, Validators.required),
      selectCheckCourse: new FormControl(false, Validators.required),
      selectCountry: new FormControl(false, Validators.required),
      selectFr: new FormControl(false, Validators.required),
      selectInfectCourse: new FormControl(false, Validators.required),
      selectInpDate: new FormControl(false, Validators.required),
      selectPatientId: new FormControl(false, Validators.required),
      selectRegion: new FormControl(false, Validators.required),
      selectRegionFact: new FormControl(false, Validators.required),
      selectRegOnDate: new FormControl(false, Validators.required),
      selectSnils: new FormControl(false, Validators.required),
      selectStage: new FormControl(false, Validators.required),
      selectTransfArea: new FormControl(false, Validators.required),
      selectUnrz: new FormControl(false, Validators.required)

      //#endregion
    });
  }

  /** Метод для сброса формы */
  resetForm() {
    this.form.reset();
  }

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