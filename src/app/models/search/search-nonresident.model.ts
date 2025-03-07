import { Validators } from "@angular/forms"
import { BaseSearchModel } from "../../base/models/base-search.model"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

@FormModel
export class SearchNonresidentModel extends BaseSearchModel {

   //#region поля

   @FormField({})
   sex: string = ''

   @FormField({})
   stageDateStart: string = ''

   @FormField({})
   stageDateEnd: string = ''

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
   dateDiagnosisStart: string = ''

   @FormField({})
   dateDiagnosisEnd: string = ''

   @FormField({ value: ['Все'], disabled: true })
   placeDiagnosis: string[] = ['Все']

   @FormField({ value: 'Все' })
   dateRegistrationYNA: string = 'Все'

   @FormField({})
   dateRegistrationStart: string = ''

   @FormField({})
   dateRegistrationEnd: string = ''

   @FormField({ value: 'Все' })
   dateDepartureYNA: string = 'Все'

   @FormField({})
   dateDepartureStart: string = ''

   @FormField({})
   dateDepartureEnd: string = ''

   //#endregion

   //#region select поля

   @FormField({ value: false, validators: [Validators.required] })
   selectSex: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectShowIllnes: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectUfsin: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDateDiagnosis: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectPlaceDiagnosis: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDateRegistration: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDateDeparture: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectAddr: boolean = false

   //#endregion
   
  urlSegment(): string {
   return "SearchNonresident"
 }
}