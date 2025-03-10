import { Validators } from "@angular/forms"
import { BaseSearchModel } from "src/app/base/models/base-search.model"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

@FormModel
export class SearchTreatmentModel extends BaseSearchModel {

   //#region поля

   @FormField({})
   sex: string = ''
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
   @FormField({})
   diePreset: string = ''
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
   @FormField({})
   ibSelect: string = ''
   @FormField({ value: 'Все' })
   ufsinYNA: string = 'Все'
   @FormField({})
   dateUfsinStart: string = ''
   @FormField({})
   dateUfsinEnd: string = ''
   @FormField({ value: ['Все'], disabled: true })
   invalid: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   correspIllnesses: string[] = ['Все']
   @FormField({})
   dateCorrespIllnessesStart: string = ''
   @FormField({})
   dateCorrespIllnessesEnd: string = ''
   @FormField({ value: ['Все'], disabled: true })
   schema: string[] = ['Все']


   @FormField({ value: false })
   schemaLast?: boolean = false


   @FormField({ value: ['Все'], disabled: true })
   schemaMedecine: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   medecine: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   medecineGive: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   doctor: string[] = ['Все']
   @FormField({})
   dateGiveStart: string = ''
   @FormField({})
   dateGiveEnd: string = ''
   @FormField({ value: ['Все'], disabled: true })
   schemaChange: string[] = ['Все']
   @FormField({})
   cardNo: string = ''
   @FormField({})
   dateSchemaStart: string = ''
   @FormField({})
   dateSchemaEnd: string = ''
   @FormField({ value: ['Все'], disabled: true })
   finSource: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   art: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   rangeTherapy: string[] = ['Все']
   @FormField({})
   dateVlStart: string = ''
   @FormField({})
   dateVlEnd: string = ''
   @FormField({})
   resVlStart: string = ''
   @FormField({})
   resVlEnd: string = ''
   @FormField({})
   dateIMStart: string = ''
   @FormField({})
   dateImEnd: string = ''
   @FormField({})
   resImStart: string = ''
   @FormField({})
   resImEnd: string = ''

   //#endregion

   //#region select поля

   @FormField({ value: false, validators: [Validators.required] })
   selectSex: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDieDate: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDieCourse: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectShowIllnes: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectIb: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectUfsin: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectInvalid: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectCorrespIllnesses: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectSchema: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectSchemaMedecine: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectMedecine: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectMedecineGive: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectDoctor: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectGiveDate: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectSchemaChange: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectCardNo: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectSchemaDate: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectFinSource: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectArt: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectRangeTherapy: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectVlDate: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectVlRes: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectImDate: boolean = false

   @FormField({ value: false, validators: [Validators.required] })
   selectImRes: boolean = false

   //#endregion

   urlSegment(): string {
      return "SearchTreatment"
   }
}