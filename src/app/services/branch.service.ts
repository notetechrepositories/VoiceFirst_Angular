import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }

  getBranchByCompanyId(id:number){
    return this.http.get<any>(`https://localhost:7134/api/branch/get-branch-by-companyId?companyId=${id}`)
  }
}
