import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ToolsService} from "../tools.service";

@Injectable({
  providedIn: 'root'
})
export class DataServingService {

  constructor(private http: HttpClient) { }

  postData(data: any) {
    console.log(data)
    return this.http.post('http://localhost:3000/data', data)
  }

  postToolServiceData(){
    console.log(ToolsService.Db.ObjList)
    // console.log(this.http.post('http://localhost:3000/data', ToolsService.Db.ObjList));
    return this.http.post('http://localhost:3000/data', ToolsService.Db.ObjList);
  }

  deleteToolServiceData(){
    return this.http.delete('http://localhost:3000/delete-all')
  }
}
