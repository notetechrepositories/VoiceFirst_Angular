import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){}

  accessToken = localStorage.getItem('accessToken');
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });


  getCustomerDetails(){
    return this.http.get<any>("https://localhost:7134/api/user/get-userdetail-by-userId",{headers:this.headers})
  }

  customerRegistration(data:any){
    return this.http.post<any>(`https://localhost:7134/api/user/userRegisteration`,data)
  }
}
