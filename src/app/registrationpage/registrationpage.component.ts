import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompanyService } from '../services/company.service';


@Component({
  selector: 'app-registrationpage',
  standalone: true,
  imports: [FormsModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './registrationpage.component.html',
  styleUrl: './registrationpage.component.css',
})
export class RegistrationpageComponent {
  pincode!: string;

  data: any;
  countries: any[] = [];
  countryViewArray: any[] = [];
  regionView!: string;
  subRegionView!: string;
  placeView: any[] = [];

  companyRegForm!:FormGroup;

  constructor(private http: HttpClient,
              private fb:FormBuilder,
              private companyService:CompanyService
              ) {}

  ngOnInit() {
    this.fetchCountries();
    this.formfile();
  }


  formfile(){

    this.companyRegForm = this.fb.group({
      company_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      sub_region: ['', Validators.required],
      place: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      password: ['', Validators.required]
    });

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
    if(this.placeView.length==1){
      this.companyRegForm.patchValue({
        place: this.placeView[0].placeName
      });
    }
    if (this.placeView[0].adminName1 != '') {
      this.regionView = this.placeView[0].adminName1;
    }
    if (this.placeView[0].adminName2 != '') {
      this.subRegionView = this.placeView[0].adminName2;
    }
  }




onRegister(){
  console.log(this.companyRegForm.value);
  // this.companyService.registerCompanyByCompany(this.companyRegForm.value).subscribe({
  //   next:(res)=>{
  //     console.log(res);
  //   },
  //   error:(error)=>{
  //     console.log(error);
  //   }
  // })
  
}


}
