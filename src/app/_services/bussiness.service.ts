import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BussinessService {

  constructor(   private http: HttpClient) { }
  addBussiness(postdata) {
    return this.http.post('business/',postdata);
  }

  getBusiness(){
    return this.http.get('business/');
  }

  updateBusiness(id,data){
    return this.http.put('business/'+id+'/',data);
  }
}
