import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient){}

  accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiJjMzdiNmY4ZS0zZTAwLTQwMzktYjAzYi00MDIzNzllOTE4MmEiLCJpYXQiOiIxNC0wNi0yMDI0IDEwOjE0OjMwIiwidXNlcl9pZCI6IjEiLCJleHAiOjE3MjE4MTYwNzAsImlzcyI6IkpXVEF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiSldUU2VydmljZVBvc3RtYW5DbGllbnQifQ.TORSKJB5fdcmWPgDUc8UN8XqR_j4wxYRquhkC4HH8pM"
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
