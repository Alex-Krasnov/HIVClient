import { BaseSearchModel } from "src/app/base/models/base-search.model"

 export class SearchPregnantModel extends BaseSearchModel{
   
   //#region поля

   showIllnes: string[] = ['Все']
   dateShowIllnesStart: string  = ''
   dateShowIllnesEnd: string  = ''
   ufsinYNA: string  = ''
   dateUfsinStart: string  = ''
   dateUfsinEnd: string  = ''
   pregCheck: string[] = ['Все']
   pregMonthNo: string  = ''
   birthType: string[] = ['Все']
   medecineStartMonthNo: string  = ''
   childBirthDateStart: string  = ''
   childBirthDateEnd: string  = ''
   childFamilyName: string  = ''
   childFirstName: string  = ''
   childThirdName: string  = ''
   cardNo: string  = ''
   phpSchema1: string[] = ['Все']
   phpSchema2: string[] = ['Все']
   phpSchema3: string[] = ['Все']
   medecineForSchema1: string[] = ['Все']
   medecineForSchema2: string[] = ['Все']
   medecineForSchema3: string[] = ['Все']
   art: string[] = ['Все']
   materhome: string[] = ['Все']
   aclDateStart: string  = ''
   aclDateEnd: string  = ''
   aclMcnCodeStart: string  = ''
   aclMcnCodeEnd: string  = ''
   
   //#endregion
 
   //#region select поля
 
   selectShowIllnes : boolean = false
   selectUfsin : boolean = false
   selectPregCheck : boolean = false
   selectPregMonthNo : boolean = false
   selectBirthType : boolean = false
   selectMedecineStartMonthNo : boolean = false
   selectChildBirthDate : boolean = false
   selectChildFio : boolean = false
   selectCardNo : boolean = false
   selectPhpSchema1 : boolean = false
   selectPhpSchema2 : boolean = false
   selectPhpSchema3 : boolean = false
   selectMedecineForSchema1 : boolean = false
   selectMedecineForSchema2 : boolean = false
   selectMedecineForSchema3 : boolean = false
   selectArt : boolean = false
   selectMaterhome : boolean = false
   selectAclDate : boolean = false
   selectAclMcnCode : boolean = false
   
   //#endregion

   urlSegment(): string {
      return "SearchPregnant"
   }
 }