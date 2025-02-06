import { FormControl } from '@angular/forms'
import { BaseSearchForm } from 'src/app/base/models/base-search-form.model';
import { ListService } from 'src/app/services/list.service';
import { InList } from 'src/app/validators/in-lst';

export class SearchPregnantForm extends BaseSearchForm {

  constructor(protected listService: ListService) {
    super(listService);

    //#region поля

    this.form.addControl('showIllnes', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('dateShowIllnesStart', new FormControl(''));
    this.form.addControl('dateShowIllnesEnd', new FormControl(''));
    this.form.addControl('transfFederYNA', new FormControl('Все', [], InList.validateYNA(this.listService)));
    this.form.addControl('ufsinYNA', new FormControl('Все', [], InList.validateYNA(this.listService)));
    this.form.addControl('dateUfsinStart', new FormControl(''));
    this.form.addControl('dateUfsinEnd', new FormControl(''));
    this.form.addControl('pregCheck', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('pregMonthNo', new FormControl(''));
    this.form.addControl('birthType', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('medecineStartMonthNo', new FormControl(''));
    this.form.addControl('childBirthDateStart', new FormControl(''));
    this.form.addControl('childBirthDateEnd', new FormControl(''));
    this.form.addControl('childFamilyName', new FormControl(''));
    this.form.addControl('childFirstName', new FormControl(''));
    this.form.addControl('childThirdName', new FormControl(''));
    this.form.addControl('cardNo', new FormControl(''));
    this.form.addControl('phpSchema1', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('phpSchema2', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('phpSchema3', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('medecineForSchema1', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('medecineForSchema2', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('medecineForSchema3', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('art', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('materhome', new FormControl({ value: ['Все'], disabled: true }));
    this.form.addControl('aclDateStart', new FormControl(''));
    this.form.addControl('aclDateEnd', new FormControl(''));
    this.form.addControl('aclMcnCodeStart', new FormControl(''));
    this.form.addControl('aclMcnCodeEnd', new FormControl(''));

    //#endregion

    //#region select поля

    this.form.addControl('selectShowIllnes', new FormControl(true));
    this.form.addControl('selectUfsin', new FormControl(true));
    this.form.addControl('selectPregCheck', new FormControl(true));
    this.form.addControl('selectPregMonthNo', new FormControl(true));
    this.form.addControl('selectBirthType', new FormControl(true));
    this.form.addControl('selectMedecineStartMonthNo', new FormControl(true));
    this.form.addControl('selectChildBirthDate', new FormControl(true));
    this.form.addControl('selectChildFio', new FormControl(true));
    this.form.addControl('selectCardNo', new FormControl(true));
    this.form.addControl('selectPhpSchema1', new FormControl(true));
    this.form.addControl('selectPhpSchema2', new FormControl(true));
    this.form.addControl('selectPhpSchema3', new FormControl(true));
    this.form.addControl('selectMedecineForSchema1', new FormControl(true));
    this.form.addControl('selectMedecineForSchema2', new FormControl(true));
    this.form.addControl('selectMedecineForSchema3', new FormControl(true));
    this.form.addControl('selectArt', new FormControl(true));
    this.form.addControl('selectMaterhome', new FormControl(true));
    this.form.addControl('selectAclDate', new FormControl(true));
    this.form.addControl('selectAclMcnCode', new FormControl(true));

    //#endregion
  }

  setDefaultValues() {
    super.setDefaultValues();

    this.form.patchValue({
      //#region поля

      showIllnes: ['Все'],
      dateShowIllnesStart: '',
      dateShowIllnesEnd: '',
      transfFederYNA: 'Все',
      ufsinYNA: 'Все',
      dateUfsinStart: '',
      dateUfsinEnd: '',
      pregCheck: ['Все'],
      pregMonthNo: '',
      birthType: ['Все'],
      medecineStartMonthNo: '',
      childBirthDateStart: '',
      childBirthDateEnd: '',
      childFamilyName: '',
      childFirstName: '',
      childThirdName: '',
      cardNo: '',
      phpSchema1: ['Все'],
      phpSchema2: ['Все'],
      phpSchema3: ['Все'],
      medecineForSchema1: ['Все'],
      medecineForSchema2: ['Все'],
      medecineForSchema3: ['Все'],
      art: ['Все'],
      materhome: ['Все'],
      aclDateStart: '',
      aclDateEnd: '',
      aclMcnCodeStart: '',
      aclMcnCodeEnd: '',

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

      selectShowIllnes: false,
      selectUfsin: false,
      selectPregCheck: false,
      selectPregMonthNo: false,
      selectBirthType: false,
      selectMedecineStartMonthNo: false,
      selectChildBirthDate: false,
      selectChildFio: false,
      selectCardNo: false,
      selectPhpSchema1: false,
      selectPhpSchema2: false,
      selectPhpSchema3: false,
      selectMedecineForSchema1: false,
      selectMedecineForSchema2: false,
      selectMedecineForSchema3: false,
      selectArt: false,
      selectMaterhome: false,
      selectAclDate: false,
      selectAclMcnCode: false

      //#endregion
    });
  }
}