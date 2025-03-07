import { Validators } from "@angular/forms"
import { BaseSearchModel } from "src/app/base/models/base-search.model"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

@FormModel
export class SearchVisitModel extends BaseSearchModel {

   //#region поля

   @FormField({})
   sex: string = ''

   @FormField({ value: ['Все'], disabled: true })
   showIllnes: string[] = ['Все']

   @FormField({})
   dateShowIllnesStart: string = ''

   @FormField({})
   dateShowIllnesEnd: string = ''

   @FormField({ value: 'Все' })
   ufsinYNA: string = 'Все'

   @FormField({})
   dateUfsinStart: string = ''

   @FormField({})
   dateUfsinEnd: string = ''

   @FormField({})
   regDateStart: string = ''

   @FormField({})
   regDateEnd: string = ''

   @FormField({})
   checkDateStart: string = ''

   @FormField({})
   checkDateEnd: string = ''

   @FormField({ value: ['Все'], disabled: true })
   doctor: string[] = ['Все']

   @FormField({})
   cardNo: string = ''

   @FormField({ value: ['Все'], disabled: true })
   art: string[] = ['Все']

   @FormField({ value: 'Все' })
   regCheck: string = 'Все'

   //#endregion

   //#region select поля

   @FormField({ value: false, validators: [Validators.required] })
   selectSex: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectShowIllnes: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectUfsin: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectRegDate: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectCheckDate: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDoctor: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectCardNo: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectArt: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectRegCheck: boolean = false

   //#endregion

   urlSegment(): string {
      return "SearchVisit"
   }
}