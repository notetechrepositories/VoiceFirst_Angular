import { Component } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { CompanyModel } from '../model/CompanyModel';
import { ConfirmationService, MessageService} from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormsModule,FormControl,Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { CompanyRegistrationModel } from '../model/CompanyRegistrationModel';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


declare var bootstrap: any;


@Component({
  selector: 'app-superadmin-companydetails',
  standalone: true,
  imports: [TableModule,ToastModule,CommonModule,TagModule,DropdownModule,ButtonModule,InputTextModule,FormsModule,HttpClientModule,DialogModule,ConfirmPopupModule],
  providers: [ConfirmationService,MessageService, CompanyService],
  templateUrl: './superadmin-companydetails.component.html',
  styleUrl: './superadmin-companydetails.component.css'
})
export class SuperadminCompanydetailsComponent {


  company!: CompanyModel[];

  companyRegistration: CompanyRegistrationModel = new CompanyRegistrationModel()

  companyListView:boolean=true;
  AddCompanyvisible:boolean=false;

  searchValue: string | undefined;

  pincode!: string;
  data: any;
  countries: any[] = [];
  countryViewArray: any[] = [];
  regionView!: string;
  subRegionView!: string;
  placeView: any[] = [];
  companyId!:number;
 
  branch:any[]=[];
  companyWithBranch:any;
  map: mapboxgl.Map | any;



  showMessage:boolean=false;
  

  constructor(private companyService: CompanyService,
              private http: HttpClient,
              private confirmationService:ConfirmationService,
              private messageService:MessageService
            ) {}

  ngOnInit() {
    this.getCompanyDetails();
    this. fetchCountries();
    this.mapInitialization();
  }

  closeModal() {
    const modalElement = document.getElementById('AddCompanyModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }


  getCompanyDetails(){
    this.companyService.getCompantDetails().subscribe({
      next:(res)=>{
        this.company=res;
        console.log(this.company);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  getStatusLabel(status: number) {
    return status === 1 ? 'APPROVED' : 'UNAPPROVED';
  }



  getSeverityisApproved(status: string) {
    return status === "APPROVED" ? 'success' : 
       status === "DECLINED" ? 'danger' : 
       'warning';
  }

  getSeverityisActive(status: number) {
    return status === 1 ? 'success' : 'danger';
  }

  onCompanyView(id:number){
    this.companyListView=false;
    this.companyService.getBranchwithCompanyId(id).subscribe({
      next:(res)=>{
          console.log(res);
          this.companyWithBranch=res;
          this.branch=res.getBranch;
          console.log(this.branch);
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

  onstatusClick(event:any,id:number,status:string){

    if(status=="PENDING"){
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to approve the request?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.companyService.updateStatusBySuperadmin(id,0).subscribe({
                next:(res)=>{
                  console.log(res);
                  const company = this.company.find(c => c.company_id === this.companyId);
                  if (company) {
                      company.status="APPROVED";
                  }
                  this.getCompanyDetails();
                },
                error:(error)=>{
                  console.log(error);
                }
              })
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status updated', life: 3000 });
        },
        reject: () => {
          this.companyService.updateStatusBySuperadmin(id,1).subscribe({
            next:(res)=>{
              console.log(res);
              const company = this.company.find(c => c.company_id === this.companyId);
              if (company) {
                  company.status="DECLINED";
              }
               this.getCompanyDetails();
            },
            error:(error)=>{
              console.log(error);
            }
          })
            this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'Status rejected', life: 3000 });
        }
    });
    }
    else if(status=="APPROVED"){
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to decline the request?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.companyService.updateStatusBySuperadmin(id,1).subscribe({
                next:(res)=>{
                  console.log(res);
                  const company = this.company.find(c => c.company_id === this.companyId);
                  if (company) {
                      company.status="DECLINED";
                  }
                  this.getCompanyDetails();
                },
                error:(error)=>{
                  console.log(error);
                }
              })
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status updated', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
    }
    else{
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to approve the request?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.companyService.updateStatusBySuperadmin(id,0).subscribe({
                next:(res)=>{
                  console.log(res);
                  const company = this.company.find(c => c.company_id === this.companyId);
                  if (company) {
                      company.status="APPROVED";
                  }
                  this.getCompanyDetails();
                },
                error:(error)=>{
                  console.log(error);
                }
              })
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status updated', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
    }
   
  }

  showAddCompanyDialog(){
    this.AddCompanyvisible=true;
  }

  onCompanyback(){
    this.companyListView=true;
  }

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

// -------------------------------------------

  onAddCompany(){
    this.companyRegistration.country='';
    this.companyRegistration.region='';
    this.companyRegistration.sub_region='';
    this.companyRegistration.place='';
    this.companyRegistration.company_name='';
    this.companyRegistration.user_name='';
    this.companyRegistration.pincode='';
    this.companyRegistration.address='';
    this.companyRegistration.latitude=0;
    this.companyRegistration.longitude=0;
    this.companyRegistration.email='';
    this.companyRegistration.phone_number='';

  }

  getCountryDetailsByPincode(event:any) {
    this.pincode=event.target.value;
    console.log(this.pincode);
    this.companyRegistration.country='';
    this.companyRegistration.region='';
    this.companyRegistration.sub_region='';
    this.companyRegistration.place='';
    this.countryViewArray = [];
    this.placeView = [];
    this.regionView = '';
    this.subRegionView = '';
    
    const apiUrl = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${this.pincode}&username=anil`;
   
    this.http.get<any>(apiUrl).subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);
        
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
              console.log(this.countryViewArray);
            }
          }
        }
        if (this.countryViewArray.length == 1) {
          this.companyRegistration.country=this.countryViewArray[0].countryName;
          this.companyRegistration.region = this.data.postalcodes[0].adminName1;
          this.companyRegistration.sub_region = this.data.postalcodes[0].adminName2;
          this.companyRegistration.place = this.data.postalcodes[0].placeName;
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  changeCountry(event: any) {
    console.log(event.target.value);
    this.companyRegistration.place='';
    this.placeView = [];
    this.regionView = '';
    this.subRegionView = '';
    this.placeView = this.data.postalcodes.filter(
      (country: any) => country.countryCode === event.target.value
    );
    
    if(this.placeView.length==1){
      this.companyRegistration.place=this.placeView[0].placeName;
    }
   
    
    if (this.placeView[0].adminName1 != '') {
      this.regionView = this.placeView[0].adminName1;
      this.companyRegistration.region=this.regionView;
      
    }
    if (this.placeView[0].adminName2 != '') {
      this.subRegionView = this.placeView[0].adminName2;
      this.companyRegistration.sub_region=this.subRegionView;
    }
  }

  onRegister(){
    let country = this.countries.find(
      (c) => c.countryCode === this.companyRegistration.country
    );
    console.log(this.companyRegistration);
    
    this.companyService.registerCompanyByAdmin(this.companyRegistration).subscribe({
      next:(res)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered Successfully', life: 3000 });
        this.closeModal();
        this.getCompanyDetails();
      },
      error:(error)=>{
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Something went wrong', life: 3000 });
      }
    })
    
  }

 onlatlongClick(){
  this.showMessage=true;
 }

//-----------------------------Map---------------------------------

mapInitialization() {
  (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYXRodWwta3MiLCJhIjoiY2x5Z3lmZWZtMGZ4czJ3b3JtdnE0bHZhMiJ9.Oad5fegSE0aeeN9_O2bo9w';
  this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-74.5, 40],
    zoom: 9,
  });

  const geocoder = new MapboxGeocoder({
    accessToken: (mapboxgl as any).accessToken,
    mapboxgl: mapboxgl as any,
    marker: true,
    language: 'es',
  });

  document.getElementById('geocoder-container')!.appendChild(geocoder.onAdd(this.map));

  geocoder.on('result', (e: any) => {
    const coords = e.result.geometry.coordinates;
    this.companyRegistration.latitude = coords[1];
    this.companyRegistration.longitude = coords[0];
    this.showMessage=false;
  });

  geocoder.on('clear', () => {
    this.companyRegistration.latitude = 0;
    this.companyRegistration.longitude = 0;
  });
  
}


}

