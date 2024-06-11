import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient){}


getCompantDetails(){
  return this.http.get<any>("https://localhost:7134/api/company/get-company-details");
}

}
