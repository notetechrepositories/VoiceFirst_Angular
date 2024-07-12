
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { BrowserService } from './browser.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7134/api'; 

  accessToken :any;

  constructor(private http:HttpClient,private browserService:BrowserService) {
    if (typeof window !== 'undefined') {
      this.accessToken = this.browserService.getItem('accessToken');
    }
   }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
  }

  login(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/authentication/login`,data);
  }

  logout(){
    return this.http.post<any>(`${this.apiUrl}/authentication/logout`,{headers:this.headers});
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

}
