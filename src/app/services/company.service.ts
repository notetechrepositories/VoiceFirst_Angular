import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient){}

  accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI2MjhmNzcyYS01MTUyLTQwZWMtYjE0ZC1kMTE5YTBkNmQ4MzgiLCJpYXQiOiIxMi0wNi0yMDI0IDEyOjA2OjMxIiwidXNlcl9pZCI6IjEiLCJleHAiOjE3MjE2NDk5OTEsImlzcyI6IkpXVEF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiSldUU2VydmljZVBvc3RtYW5DbGllbnQifQ.xciG0bcvgutvpwtT8uX8tPW01S-JoohDFkzAVchtHfA"
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

getCompantDetails(){
  return this.http.get<any>("https://localhost:7134/api/company/get-company-details");
}

registerCompany(data:any){
  return this.http.post<any>(`https://localhost:7134/api/company/register-company-by-admin`,data,{headers:this.headers})
}

}
