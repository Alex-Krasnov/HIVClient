import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { SelectSchemaModel } from "../_interfaces/select-schema.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SelectSchemaService {
  url: string = `${environment.apiUrl}/api/SchemaSelect`;
  constructor(private http: HttpClient){}

  getData(): Observable<SelectSchemaModel[]>{
      return this.http.get<SelectSchemaModel[]>(this.url);
  };

  getSchema(id: number[]):Observable<any>{
    return this.http.post(this.url+`/GetSchema`, {
      id
  })
  }
}
