import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { BranchModel } from '../model/BranchModel';
import { FormsModule,Validators,ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BranchService } from '../services/branch.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { jwtDecode } from 'jwt-decode';
import { BranchRegistrationModel } from '../model/BranchRegistrationModel';



declare var bootstrap: any;

@Component({
  selector: 'app-company-branchdetails',
  standalone: true,
  providers: [ConfirmationService,MessageService,BranchService],
  imports: [TagModule,ToastModule,TableModule,FormsModule,CommonModule,HttpClientModule,ConfirmPopupModule,ReactiveFormsModule],
  templateUrl: './company-branchdetails.component.html',
  styleUrl: './company-branchdetails.component.css'
})
export class CompanyBranchdetailsComponent {

  branch!:BranchModel[];

  branchRegistration!:BranchRegistrationModel[];

  branchId!:number;

  branchAddForm!:FormGroup;

  companyId!:number;

  accessToken!:any;

  selectedFile: File | null = null;

  pincode!: string;
  data: any;
  countries: any[] = [];
  countryViewArray: any[] = [];
  regionView!: string;
  subRegionView!: string;
  placeView: any[] = [];



  constructor(private branchService:BranchService,
              private confirmationService:ConfirmationService,
              private messageService:MessageService,
              private fb:FormBuilder,
              private http:HttpClient
             ){}

  ngOnInit(){
    this.getBranchByCompanyId()
    this. fetchCountries();
    this.form(); 
  }

  form(){
    this.branchAddForm=this.fb.group({
      branch_name: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
      company_id: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      sub_region: ['', Validators.required],
      place: ['', Validators.required],
      formFile:[null, Validators.required]
    });
  }

  // ===============================================================

  fetchCountries() {
    this.http.get<any[]>('/assets/countryList.json').subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        console.error('There was an error fetching the JSON data!', error);
      },
    });
  }

  getCountryDetailsByPincode(event:any) {
    this.pincode=event.target.value
    this.countryViewArray = [];
    this.placeView = [];
    this.regionView = '';
    this.subRegionView = '';
    
    const apiUrl = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${this.pincode}&username=anil`;
   
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        this.data = response;
        var filterData=[];
        console.log(this.data);
        for (let j = 0; j < this.data.postalcodes.length; j++) {
          let array = this.data.postalcodes[j].postalcode.split(" ");
          let compressedString = array.join("");
          if(compressedString==this.pincode){
            filterData.push(this.data.postalcodes[j])
          }
        }
        this.data.postalcodes=filterData;
        console.log(this.data);
        let seenCountryCodes = new Set();
        for (let i = 0; i < this.data.postalcodes.length; i++) {
          let countryCode = this.data.postalcodes[i].countryCode;
          if (!seenCountryCodes.has(countryCode)) {
            seenCountryCodes.add(countryCode);
            let country = this.countries.find(
              (c) => c.countryCode === countryCode
            );
            if (country) {
              this.countryViewArray.push(country);
            }
          }
        }
        if (this.countryViewArray.length == 1) {
          this.regionView = this.data.postalcodes[0].adminName1;
          this.subRegionView = this.data.postalcodes[0].adminName2;
          this.placeView = this.data.postalcodes;
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  changeCountry(event: any) {
    this.placeView = [];
    this.regionView = '';
    this.subRegionView = '';
    this.placeView = this.data.postalcodes.filter(
      (country: any) => country.countryCode === event.target.value
    );
    console.log(this.placeView);
    
    if(this.placeView.length==1){
      this.branchAddForm.patchValue({
        place: this.placeView[0].placeName
      });
      console.log(this.placeView[0].placeName);
      
    }
    if (this.placeView[0].adminName1 != '') {
      this.regionView = this.placeView[0].adminName1;
      console.log(this.regionView);
      
    }
    if (this.placeView[0].adminName2 != '') {
      this.subRegionView = this.placeView[0].adminName2;
      console.log(this.subRegionView);
    }
    
  }

  // ===============================================================

  closeModal() {
    const modalElement = document.getElementById('AddBranchModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  onAddBranch(){
    this.branchAddForm.reset();
    this.selectedFile=null;
  }

  getBranchByCompanyId(){
    this.accessToken= localStorage.getItem('accessToken');
    const decodedToken = this.decodeToken(this.accessToken);
    this.companyId=decodedToken.user_id
    this.branchService.getBranchByCompanyId(this.companyId).subscribe({
      next:(res)=>{
        console.log(res);
        this.branch=res;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  getStatusLabel(status: number) {
    return status === 1 ? 'ACTIVE' : 'INACTIVE';
  }

  getSeverityisActive(status: number) {
    return status === 1 ? 'success' : 'danger';
  }

 
  onBranchView(id:number){

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  
  onRegister(){
    this.branchAddForm.patchValue({
      branch_name:this.branchAddForm.value.branch_name ,
      address: this.branchAddForm.value.address,
      phone_number: this.branchAddForm.value.phone_number,
      email: this.branchAddForm.value.email,
      company_id: this.companyId,
      latitude:parseFloat(this.branchAddForm.value.latitude),
      longitude:parseFloat(this.branchAddForm.value.longitude),
      pincode: this.branchAddForm.value.pincode,
      country: this.branchAddForm.value.country,
      region: this.branchAddForm.value.region,
      sub_region: this.branchAddForm.value.sub_region,
      place: this.branchAddForm.value.place,
      formFile:this.selectedFile
    });
    const branchData=this.branchAddForm.value;
    console.log(branchData);
      this.branchService.insertBranch(branchData).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered Successfully', life: 3000 });
          this.closeModal();
          this.selectedFile=null;
        },
        error:(error)=>{
          console.log("Error",error);
          this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Something went wrong', life: 3000 });
        }
      })
  }


onstatusClick(id:number){
  this.branchId=id;
}

onStatusChange(event:any,status:number){
  const updatedStatus = status === 1 ? 0 : 1;

  this.confirmationService.confirm({
    target: event.target as EventTarget,
    message: 'Are you sure you want to change status?',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.branchService.updateStatus(updatedStatus,this.branchId).subscribe({
        next:(res)=>{
         console.log(res);
         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully updated', life: 3000 });
        },
        error:(error)=>{
          console.log(error);
          this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Something went wrong', life: 3000 });
        }
      });
    },
    reject: () => {
        
    }
});
  
}

decodeToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch (Error) {
    return null;
  }
}

//-----------------------------Map---------------------------------

}
