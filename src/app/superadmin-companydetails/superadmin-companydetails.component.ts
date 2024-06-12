import { Component } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { CompanyModel } from '../model/CompanyModel';
import { MessageService} from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { CompanyRegistrationModel } from '../model/CompanyRegistrationModel';
import { log } from 'console';




@Component({
  selector: 'app-superadmin-companydetails',
  standalone: true,
  imports: [TableModule,ToastModule,CommonModule,TagModule,DropdownModule,ButtonModule,InputTextModule,FormsModule,HttpClientModule,DialogModule],
  providers: [MessageService, CompanyService],
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




  constructor(private companyService: CompanyService, private http: HttpClient) {}

  ngOnInit() {
    this.getCompanyDetails();
    this. fetchCountries();
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

  onCompanyView(){
    this.companyListView=false;
  }

  showAddCompanyDialog(){
    this.AddCompanyvisible=true;
  }
  onCompanyback(){
    this.companyListView=true;
  }

// -------------------------------------------


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
    
    // this.companyRegistration.country=country.countryName;
     
    this.companyService.registerCompany(this.companyRegistration).subscribe({
      next:(res)=>{
        console.log(res);
        
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
    
  }
}

