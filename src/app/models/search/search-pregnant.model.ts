import { Validators } from "@angular/forms"
import { BaseSearchModel } from "src/app/base/models/base-search.model"
import { FormField } from "src/app/decorators/form-field.decorator"
import { FormModel } from "src/app/decorators/form-model.decorator"

 @FormModel
 export class SearchPregnantModel extends BaseSearchModel{
   
   //#region поля

   @FormField({ value: ['Все'], disabled: true })
   showIllnes: string[] = ['Все']
   @FormField({})
   dateShowIllnesStart: string  = ''
   @FormField({})
   dateShowIllnesEnd: string  = ''
   @FormField({})
   ufsinYNA: string  = ''
   @FormField({})
   dateUfsinStart: string  = ''
   @FormField({})
   dateUfsinEnd: string  = ''
   @FormField({ value: ['Все'], disabled: true })
   pregCheck: string[] = ['Все']
   @FormField({})
   pregMonthNo: string  = ''
   @FormField({ value: ['Все'], disabled: true })
   birthType: string[] = ['Все']
   @FormField({})
   medecineStartMonthNo: string  = ''
   @FormField({})
   childBirthDateStart: string  = ''
   @FormField({})
   childBirthDateEnd: string  = ''
   @FormField({})
   childFamilyName: string  = ''
   @FormField({})
   childFirstName: string  = ''
   @FormField({})
   childThirdName: string  = ''
   @FormField({})
   cardNo: string  = ''
   @FormField({ value: ['Все'], disabled: true })
   phpSchema1: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   phpSchema2: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   phpSchema3: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   medecineForSchema1: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   medecineForSchema2: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   medecineForSchema3: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   art: string[] = ['Все']
   @FormField({ value: ['Все'], disabled: true })
   materhome: string[] = ['Все']
   @FormField({})
   aclDateStart: string  = ''
   @FormField({})
   aclDateEnd: string  = ''
   @FormField({})
   aclMcnCodeStart: string  = ''
   @FormField({})
   aclMcnCodeEnd: string  = ''
   
   //#endregion
 
   //#region select поля
 
   @FormField({ value: false, validators: [Validators.required] })
   selectShowIllnes : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectUfsin : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectPregCheck : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectPregMonthNo : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectBirthType : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectMedecineStartMonthNo : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectChildBirthDate : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectChildFio : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectCardNo : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectPhpSchema1 : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectPhpSchema2 : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectPhpSchema3 : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectMedecineForSchema1 : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectMedecineForSchema2 : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectMedecineForSchema3 : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectArt : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectMaterhome : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectAclDate : boolean = false
 
   @FormField({ value: false, validators: [Validators.required] })
   selectAclMcnCode : boolean = false
   
   //#endregion

   urlSegment(): string {
      return "SearchPregnant"
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