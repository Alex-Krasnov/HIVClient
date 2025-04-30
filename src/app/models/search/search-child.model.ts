import { Validators } from "@angular/forms"
import { BaseSearchModel } from "src/app/base/models/base-search.model"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

@FormModel
export class SearchChildModel extends BaseSearchModel{

   //#region поля

   @FormField({})
   ageDayStart: string = ''
   @FormField({})
   ageDayEnd: string = ''
   @FormField({ value: ['Все'], disabled: true })
   showIllnes: string[] = ['Все']
   @FormField({})
   dateShowIllnesStart: string = ''
   @FormField({})
   dateShowIllnesEnd: string = ''

   @FormField({ value: ['Все'], disabled: true })
   familyType: string[] = ['Все']
   @FormField({})
   firstCheckDateStart: string = ''
   @FormField({})
   firstCheckDateEnd: string = ''
   @FormField({ value: ['Все'], disabled: true })
   childPlace: string[] = ['Все']
   @FormField({})
   breastMonthNoStart: string = ''
   @FormField({})
   breastMonthNoEnd: string = ''
   @FormField({ value: ['Все'], disabled: true })
   childPhp: string[] = ['Все']
   @FormField({})
   sex: string = ''
   @FormField({})
   cardNo: string = ''
   @FormField({})
   motherPatientId: string = ''
   @FormField({})
   fatherPatientId: string = ''
   @FormField({ value: ['Все'], disabled: true })
   art: string[] = ['Все']
   @FormField({})
   dateDieStart: string = ''
   @FormField({})
   dateDieEnd: string = ''
   @FormField({})
   dateDieAidsStart: string = ''
   @FormField({})
   dateDieAidsEnd: string = ''
   @FormField({ value: ['Все'], disabled: true })
   materHome: string[] = ['Все']
   @FormField({ value: 'Все' })
   form309: string = ''

   //#endregion

   //#region select поля

   @FormField({ value: true, validators: [Validators.required] })
   selectShowIllnes: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectFamilyType: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectFirstCheckDate: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectChildPlace: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectBreastMonthNo: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectChildPhp: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectSex: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectCardNo: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectParentId: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectArt: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectDieDate: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectMaterHome: boolean = true

   @FormField({ value: true, validators: [Validators.required] })
   selectForm309: boolean = true

   //#endregion
      
   urlSegment(): string {
      return "SearchChild"
   }

   setDefaultValues() {
      super.setDefaultValues();

      this.form.patchValue({
         //#region поля

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
         selectStage: true,
         selectTransfArea: true,
         selectUnrz: true

         //#endregion
      });
   }
}