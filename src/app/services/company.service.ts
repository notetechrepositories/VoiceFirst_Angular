import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrowserService } from './browser.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient,private browserService:BrowserService){}

  accessToken = this.browserService.getItem('accessToken')
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

getCompantDetails(){
  return this.http.get<any>("https://localhost:7134/api/company/get-company-details");
}

registerCompanyByAdmin(data:any){
  return this.http.post<any>(`https://localhost:7134/api/company/register-company-by-admin`,data,{headers:this.headers})
}

registerCompanyByCompany(data:any){
  return this.http.post<any>(`https://localhost:7134/api/company/register-company-by-company`,data)
}

getBranchwithCompanyId(id:number){
  return this.http.get<any>(`https://localhost:7134/api/branch/get-branch-with-company-by-id?companyId=${id}`,{headers:this.headers})
}

updateStatusBySuperadmin(id:number,status:number){
  return this.http.put<any>(`https://localhost:7134/api/company/update-company-status?companyId=${id}&status=${status}`,{},{headers:this.headers})
}

}
