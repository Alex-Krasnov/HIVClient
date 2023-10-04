import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PatientCardRecipeModel } from "../_interfaces/patient-card-recipe.model";
import { pcRecipe } from "../_interfaces/pc-recipe.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PatientCardRecipeService {
  url: string = `${environment.apiUrl}/api/PatientCardRecipe`;
  constructor(private http: HttpClient){}

  getData(id: number): Observable<PatientCardRecipeModel>{
    return this.http.get<PatientCardRecipeModel>(this.url+`?patientId=${id}`);
  };

  delRecipe(id: number, ser: string, num: string): Observable<unknown>{
    return this.http.delete(this.url+`/DelRecipe?patientId=${id}&ser=${ser}&num=${num}`)
  };

  createRecipe(recipe: pcRecipe){
    return this.http.post(this.url+`/CreateRecipe`, {
        patientId: recipe.patientId,
        ser: recipe.ser,
        num: recipe.num,
        prescrDate: recipe.prescrDate,
        doctor: recipe.doctor,
        medicine: recipe.medicine,
        packNum: recipe.packNum,
        finSource: recipe.finSource,
        giveDate: recipe.giveDate,
        giveDateCheck: recipe.giveDateCheck,
        medicineGive: recipe.medicineGive,
        packNumGive: recipe.packNumGive
    })
  };

  updateRecipe(recipe: pcRecipe){
    return this.http.post(this.url+`/UpdateRecipe`, {
      patientId: recipe.patientId,
        ser: recipe.ser,
        num: recipe.num,
        prescrDate: recipe.prescrDate,
        doctor: recipe.doctor,
        medicine: recipe.medicine,
        packNum: recipe.packNum,
        finSource: recipe.finSource,
        giveDate: recipe.giveDate,
        giveDateCheck: recipe.giveDateCheck,
        medicineGive: recipe.medicineGive,
        packNumGive: recipe.packNumGive,
        serOld: recipe.serOld,
        numOld: recipe.numOld,
    })
  };
}
