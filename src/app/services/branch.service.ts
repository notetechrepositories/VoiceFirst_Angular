import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchRegistrationModel } from '../model/BranchRegistrationModel';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private http:HttpClient) { }

  accessToken = localStorage.getItem('accessToken')
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });

  getBranchByCompanyId(id:number){
    return this.http.get<any>(`https://localhost:7134/api/branch/get-branch-by-companyId?companyId=${id}`);
  }

  updateStatus(action:number,id:number){
    return this.http.put<any>(`https://localhost:7134/api/branch/update-branch-status?action=${action}&branchId=${id}`,{});
  }

  insertBranch(branchRegistration:BranchRegistrationModel){
    const formData = new FormData();
    formData.append('branch_name', branchRegistration.branch_name);
    formData.append('address', branchRegistration.address);
    formData.append('phone_number', branchRegistration.phone_number );
    formData.append('email', branchRegistration.email );
    formData.append('company_id', branchRegistration.company_id.toString());
    formData.append('latitude', branchRegistration.latitude.toString());
    formData.append('longitude', branchRegistration.longitude.toString());
    formData.append('pincode', branchRegistration.pincode);
    formData.append('country', branchRegistration.country);
    formData.append('region', branchRegistration.region);
    formData.append('sub_region', branchRegistration.sub_region);
    formData.append('place', branchRegistration.place);
    formData.append('formFile', branchRegistration.formFile);
    return this.http.post<any>(`https://localhost:7134/api/branch/insert-branch`,formData,{headers:this.headers});
  }
}
 