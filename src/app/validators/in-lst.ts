import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { ListService } from "../services/list.service";

@Injectable({ providedIn: 'root' })
export class InList  {

  static validateInfectCourses( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListInfectCourses(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateSex( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListSex(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateRegion( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListRegion(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateIbResult( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListIbResult(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateStage( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListStage(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validatePlaceChecks( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListPlaceChecks(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateInvalid( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListInvalid(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateInfectCourseShort( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListInfectCourseShort(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateInfectCourseLong( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListInfectCourseLong(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateDieCourseShort( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListDieCourseShort(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateDieCourseLong( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListDieCourseLong(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateDeseases( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListDeseases(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateCountries( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListCountries(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateCodeMkb10s( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListCodeMkb10s(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateCheckPlace( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListCheckPlace(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateCheckCourseShort( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListCheckCourseShort(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateCheckCourseLong( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListCheckCourseLong(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateArvt( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListArvt(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateVulnerableGroup( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListVulnerableGroup(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateCorrespIllnesses( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListCorrespIllnesses(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateCureSchemaName( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListCureSchemaName(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateCureChangeName( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListCureChangeName(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateRangeTherapy( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListRangeTherapy(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateLpuName( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListLpuName(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateHospCourseName( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListHospCourseName(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }

  static validateHospResult( lst: ListService): AsyncValidatorFn  
  {   
    return (control: AbstractControl): Observable<ValidationErrors> =>{
      return lst.InListHospResult(control.value)
      .pipe(
        map((isTaken: Boolean) => ( (!isTaken) ? { inList: true } : null)),
        catchError(() => of(null))
      )
    } 
  }
}