import { Validators } from "@angular/forms"
import { BaseSearchModel } from "../../base/models/base-search.model"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

@FormModel
export class SearchMainInfModel extends BaseSearchModel {

   //#region поля

   @FormField({})
   fioChange: string = ''
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
   @FormField({ value: 'Все'})
   ibSelect: string = ''
   @FormField({})
   referenceMO: string = ''
   @FormField({ value: ['Все'], disabled: true })
   hospCourse: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   age: string[] = ['Все']
   @FormField({})
   cardNo: string = ''
   @FormField({ value: ['Все'], disabled: true })
   art: string = ''
   @FormField({ value: ['Все'], disabled: true })
   mkb10: string = ''
   @FormField({ value: 'Все' })
   archiveYNA: string = 'Все'
   @FormField({})
   archive: string = ''
   @FormField({ value: 'Все' })
   transfFederYNA: string = 'Все'
   @FormField({})
   dateTransfFederStart: string = ''
   @FormField({})
   dateTransfFederEnd: string = ''
   @FormField({ value: 'Все' })
   ufsinYNA: string = 'Все'
   @FormField({})
   dateUfsinStart: string = ''
   @FormField({})
   dateUfsinEnd: string = ''
   @FormField({})
   aids12: string = ''
   @FormField({ value: 'Все' })
   dieDiagYNA: string = 'Все'
   @FormField({})
   chemprof: string = ''
   @FormField({})
   dateChemprofStartStart: string = ''
   @FormField({})
   dateChemprofStartEnd: string = ''
   @FormField({})
   dateChemprofEndStart: string = ''
   @FormField({})
   dateChemprofEndEnd: string = ''
   @FormField({})
   dateRegStart: string = ''
   @FormField({})
   dateRegEnd: string = ''
   @FormField({ value: 'Все' })
   diePreset: string = ''
   @FormField({ value: 'Все' })
   deathTransferSubYNA: string = 'Все'

   //#endregion

   //#region select поля

   @FormField({ value: true, validators: [Validators.required] })
   selectSex: boolean = true

   @FormField({ value: false, validators: [Validators.required] })
   selectBlotCheckPlace: boolean = false

   @FormField({ value: true, validators: [Validators.required] })
   selectDieDate: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectDieCourse: boolean = true

   @FormField({ value: false, validators: [Validators.required] })
   selectShowIllnes: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectIb: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectHospCourse: boolean = false

   @FormField({ value: true, validators: [Validators.required] })
   selectAge: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectCardNo: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectArt: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectMkb10: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectArchive: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectTransfFeder: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectUfsin: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectAids12: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectChemprof: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectDieDiag: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectDateReg: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectPasSer: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectPasNum: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectPasWhom: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectPasWhen: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectDeathTransferSub: boolean = true

   //#endregion

   urlSegment(): string {
      return "SearchMainInf"
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
         ibSelect: 'Все',
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
         diePreset: 'Все',

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