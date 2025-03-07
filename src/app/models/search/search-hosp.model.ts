import { Validators } from "@angular/forms"
import { BaseSearchModel } from "src/app/base/models/base-search.model"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

@FormModel
export class SearchHospModel extends BaseSearchModel {

   //#region поля
   
   @FormField({})
   sex: string = ''
   
   @FormField({ value: 'Все' })
   ufsinYNA: string = ''
   
   @FormField({})
   dateUfsinStart: string = ''
   
   @FormField({})
   dateUfsinEnd: string = ''
   
   @FormField({})
   dateHospInStart: string = ''
   
   @FormField({})
   dateHospInEnd: string = ''
   
   @FormField({})
   dateHospOutStart: string = ''
   
   @FormField({})
   dateHospOutEnd: string = ''

   @FormField({ value: ['Все'], disabled: true })
   lpu: string[] = ['Все']
   
   @FormField({ value: ['Все'], disabled: true })
   hospCourse: string[] = ['Все']
   
   @FormField({ value: ['Все'], disabled: true })
   hospResult: string[] = ['Все']

   //#endregion

   //#region select поля

   @FormField({ value: false, validators: [Validators.required] })
   selectSex: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectUfsin: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDateHospIn: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDateHospOut: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectLpu: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectHospCourse: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectHospResult: boolean = false

   //#endregion

   urlSegment(): string {
      return "SearchHosp"
   }
}