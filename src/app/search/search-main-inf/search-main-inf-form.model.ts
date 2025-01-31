import { FormControl} from '@angular/forms'
import { BaseSearchForm } from 'src/app/base/models/base-search-form.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class SearchMainInfForm extends BaseSearchForm{

  constructor(protected listService: ListService){
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

    this.form.addControl('selectSex', new FormControl(false));
    this.form.addControl('selectBlotCheckPlace', new FormControl(false));
    this.form.addControl('selectDieDate', new FormControl(false));
    this.form.addControl('selectDieCourse', new FormControl(false));
    this.form.addControl('selectShowIllnes', new FormControl(false));
    this.form.addControl('selectIb', new FormControl(false));
    this.form.addControl('selectHospCourse', new FormControl(false));
    this.form.addControl('selectAge', new FormControl(false));
    this.form.addControl('selectCardNo', new FormControl(false));
    this.form.addControl('selectArt', new FormControl(false));
    this.form.addControl('selectMkb10', new FormControl(false));
    this.form.addControl('selectArchive', new FormControl(false));
    this.form.addControl('selectTransfFeder', new FormControl(false));
    this.form.addControl('selectUfsin', new FormControl(false));
    this.form.addControl('selectAids12', new FormControl(false));
    this.form.addControl('selectChemprof', new FormControl(false));
    this.form.addControl('selectDieDiag', new FormControl(false));
    this.form.addControl('selectDateReg', new FormControl(false));
    this.form.addControl('selectPasSer', new FormControl(false));
    this.form.addControl('selectPasNum', new FormControl(false));
    this.form.addControl('selectPasWhom', new FormControl(false));
    this.form.addControl('selectPasWhen', new FormControl(false));

    //#endregion
  }
  
  setDefaultValues() {
    super.setDefaultValues();

    this.form.patchValue({
      //#region поля

      fioChange:'',
      sex:'',
      blotCheckPlace:['Все'],
      dateDieStart:'',
      dateDieEnd:'',
      dateDieAidsStart:'',
      dateDieAidsEnd:'',
      dieCourse: ['Все'],
      showIllnes: ['Все'],
      dateShowIllnesStart:'',
      dateShowIllnesEnd:'',
      ibRes:'',
      dateIbResStart:'',
      dateIbResEnd:'',
      ibNum:'',
      dateInpIbStart:'',
      dateInpIbEnd:'',
      ibSelect:'',
      hospCourse: ['Все'],
      age: ['Все'],
      cardNo:'',
      art: ['Все'],
      mkb10: ['Все'],
      archiveYNA:'Все',
      archive:'',
      transfFederYNA:'Все',
      dateTransfFederStart:'',
      dateTransfFederEnd:'',
      ufsinYNA:'Все',
      dateUfsinStart:'',
      dateUfsinEnd:'',
      aids12:'',
      dieDiagYNA:'Все',
      chemprof:'',
      dateChemprofStartStart:'',
      dateChemprofStartEnd:'',
      dateChemprofEndStart:'',
      dateChemprofEndEnd:'',
      dateRegStart:'',
      dateRegEnd:'',
      diePreset:'',

      //#endregion

      //#region select поля

      selectSex: false,
      selectBlotCheckPlace: false,
      selectDieDate: false,
      selectDieCourse: false,
      selectShowIllnes: false,
      selectIb: false,
      selectHospCourse: false,
      selectAge: false,
      selectCardNo: false,
      selectArt: false,
      selectMkb10: false,
      selectArchive: false,
      selectTransfFeder: false,
      selectUfsin: false,
      selectAids12: false,
      selectChemprof: false,
      selectDieDiag: false,
      selectDateReg: false,
      selectPasSer: false,
      selectPasNum: false,
      selectPasWhom: false,
      selectPasWhen: false

      //#endregion
    });
  }
}