import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable} from "rxjs";
import { SelectSchemaModel } from "../_interfaces/select-schema.model";

@Injectable({
  providedIn: 'root'
})
export class SelectSchemaService {
  url: string = 'https://localhost:5001/api/SchemaSelect';
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
