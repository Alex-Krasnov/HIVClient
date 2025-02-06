import { FormControl } from '@angular/forms'
import { BaseSearchForm } from 'src/app/base/models/base-search-form.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class SearchMainInfForm extends BaseSearchForm {

  constructor(protected listService: ListService) {
    super(listService);

    //#region поля

    this.form.addControl('fioChange', new FormControl(''));
    this.form.addControl('sex', new FormControl('', [], InList.validateSex(this.listService)));
    this.form.addControl('blotCheckPlace', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('dateDieStart', new FormControl(''));
    this.form.addControl('dateDieEnd', new FormControl(''));
    this.form.addControl('dateDieAidsStart', new FormControl(''));
    this.form.addControl('dateDieAidsEnd', new FormControl(''));
    this.form.addControl('dieCourse', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('showIllnes', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('dateShowIllnesStart', new FormControl(''));
    this.form.addControl('dateShowIllnesEnd', new FormControl(''));
    this.form.addControl('ibRes', new FormControl('', [], InList.validateIbResult(this.listService)));
    this.form.addControl('dateIbResStart', new FormControl(''));
    this.form.addControl('dateIbResEnd', new FormControl(''));
    this.form.addControl('ibNum', new FormControl(''));
    this.form.addControl('referenceMO', new FormControl(''));
    this.form.addControl('dateInpIbStart', new FormControl(''));
    this.form.addControl('dateInpIbEnd', new FormControl(''));
    this.form.addControl('ibSelect', new FormControl(''));
    this.form.addControl('hospCourse', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('age', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('cardNo', new FormControl(''));
    this.form.addControl('art', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('mkb10', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('archiveYNA', new FormControl('Все', [], InList.validateYNA(this.listService)));
    this.form.addControl('archive', new FormControl(''));
    this.form.addControl('transfFederYNA', new FormControl('Все', [], InList.validateYNA(this.listService)));
    this.form.addControl('dateTransfFederStart', new FormControl(''));
    this.form.addControl('dateTransfFederEnd', new FormControl(''));
    this.form.addControl('ufsinYNA', new FormControl('Все', [], InList.validateYNA(this.listService)));
    this.form.addControl('dateUfsinStart', new FormControl(''));
    this.form.addControl('dateUfsinEnd', new FormControl(''));
    this.form.addControl('aids12', new FormControl(''));
    this.form.addControl('dieDiagYNA', new FormControl('Все', [], InList.validateYNA(this.listService)));
    this.form.addControl('chemprof', new FormControl(''));
    this.form.addControl('dateChemprofStartStart', new FormControl(''));
    this.form.addControl('dateChemprofStartEnd', new FormControl(''));
    this.form.addControl('dateChemprofEndStart', new FormControl(''));
    this.form.addControl('dateChemprofEndEnd', new FormControl(''));
    this.form.addControl('dateRegStart', new FormControl(''));
    this.form.addControl('dateRegEnd', new FormControl(''));
    this.form.addControl('diePreset', new FormControl(''));

    //#endregion

    //#region select поля

    this.form.addControl('selectSex', new FormControl(true));
    this.form.addControl('selectBlotCheckPlace', new FormControl(true));
    this.form.addControl('selectDieDate', new FormControl(true));
    this.form.addControl('selectDieCourse', new FormControl(true));
    this.form.addControl('selectShowIllnes', new FormControl(true));
    this.form.addControl('selectIb', new FormControl(true));
    this.form.addControl('selectHospCourse', new FormControl(true));
    this.form.addControl('selectAge', new FormControl(true));
    this.form.addControl('selectCardNo', new FormControl(true));
    this.form.addControl('selectArt', new FormControl(true));
    this.form.addControl('selectMkb10', new FormControl(true));
    this.form.addControl('selectArchive', new FormControl(true));
    this.form.addControl('selectTransfFeder', new FormControl(true));
    this.form.addControl('selectUfsin', new FormControl(true));
    this.form.addControl('selectAids12', new FormControl(true));
    this.form.addControl('selectChemprof', new FormControl(true));
    this.form.addControl('selectDieDiag', new FormControl(true));
    this.form.addControl('selectDateReg', new FormControl(true));
    this.form.addControl('selectPasSer', new FormControl(true));
    this.form.addControl('selectPasNum', new FormControl(true));
    this.form.addControl('selectPasWhom', new FormControl(true));
    this.form.addControl('selectPasWhen', new FormControl(true));

    //#endregion
  }

  setDefaultValues() {
    super.setDefaultValues();

    this.form.patchValue({
      //#region поля

      fioChange: '',
      sex: '',
      blotCheckPlace: ['Все'],
      dateDieStart: '',
      dateDieEnd: '',
      dateDieAidsStart: '',
      dateDieAidsEnd: '',
      dieCourse: ['Все'],
      showIllnes: ['Все'],
      dateShowIllnesStart: '',
      dateShowIllnesEnd: '',
      ibRes: '',
      dateIbResStart: '',
      dateIbResEnd: '',
      ibNum: '',
      referenceMO: '',
      dateInpIbStart: '',
      dateInpIbEnd: '',
      ibSelect: '',
      hospCourse: ['Все'],
      age: ['Все'],
      cardNo: '',
      art: ['Все'],
      mkb10: ['Все'],
      archiveYNA: 'Все',
      archive: '',
      transfFederYNA: 'Все',
      dateTransfFederStart: '',
      dateTransfFederEnd: '',
      ufsinYNA: 'Все',
      dateUfsinStart: '',
      dateUfsinEnd: '',
      aids12: '',
      dieDiagYNA: 'Все',
      chemprof: '',
      dateChemprofStartStart: '',
      dateChemprofStartEnd: '',
      dateChemprofEndStart: '',
      dateChemprofEndEnd: '',
      dateRegStart: '',
      dateRegEnd: '',
      diePreset: '',

      //#endregion

      //#region select поля

      selectFio: true,
      selectBirthDate: true,
      selectAddr: true,
      selectCheckCourse: true,
      selectCountry: true,
      selectFr: true,
      selectInfectCourse: true,
      selectInpDate: true,
      selectPatientId: true,
      selectRegion: true,
      selectRegionFact: true,
      selectRegOnDate: true,
      selectSnils: true,
      selectStage: false,
      selectTransfArea: true,
      selectUnrz: true,

      selectSex: true,
      selectBlotCheckPlace: false,
      selectDieDate: true,
      selectDieCourse: true,
      selectShowIllnes: false,
      selectIb: false,
      selectHospCourse: false,
      selectAge: true,
      selectCardNo: true,
      selectArt: true,
      selectMkb10: true,
      selectArchive: true,
      selectTransfFeder: true,
      selectUfsin: true,
      selectAids12: true,
      selectChemprof: true,
      selectDieDiag: true,
      selectDateReg: true,
      selectPasSer: true,
      selectPasNum: true,
      selectPasWhom: true,
      selectPasWhen: true

      //#endregion
    });
  }
}