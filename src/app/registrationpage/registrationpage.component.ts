import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompanyService } from '../services/company.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


@Component({
  selector: 'app-registrationpage',
  standalone: true,
  imports: [FormsModule, HttpClientModule,ReactiveFormsModule,ToastModule,CommonModule],
  providers:[CompanyService,MessageService],
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

  map: mapboxgl.Map | any;

  latitude: number | null = null;
  longitude: number | null = null;

  showMessage:boolean=false;

  constructor(private http: HttpClient,
              private fb:FormBuilder,
              private messageService:MessageService,
              private companyService:CompanyService
              ) {}

  ngOnInit() {
    this.fetchCountries();
    this.formfile();
    this.mapInitialization();
  }


  formfile(){

    this.companyRegForm = this.fb.group({
      company_name: ['', Validators.required],
      user_name: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      sub_region: ['', Validators.required],
      place: ['', Validators.required],
      latitude: [0, Validators.required],
      longitude: [0, Validators.required],
      pincode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
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
    console.log(this.placeView);
    
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
  
  this.companyRegForm.patchValue({
    company_name:this.companyRegForm.value.company_name ,
    user_name: this.companyRegForm.value.user_name,
    address: this.companyRegForm.value.address,
    country: this.companyRegForm.value.country,
    region: this.companyRegForm.value.region,
    sub_region: this.companyRegForm.value.sub_region,
    place: this.companyRegForm.value.place,
    pincode: this.companyRegForm.value.pincode,
    email: this.companyRegForm.value.email,
    phone_number: this.companyRegForm.value.phone_number,
    password: this.companyRegForm.value.password
  });

    this.companyService.registerCompanyByCompany(this.companyRegForm.value).subscribe({
      next:(res)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered Successfully', life: 3000 });
        this.companyRegForm.reset();
      },
      error:(error)=>{
        if(error.status==400){
          this.messageService.add({ severity: 'info', summary: 'Oops!', detail: error.error.message, life: 3000 });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Oops!', detail: 'Something went wrong.', life: 3000 });
        }
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
      this.latitude = coords[1];
      this.longitude = coords[0];
      this.companyRegForm.patchValue({
        latitude:this.latitude,
        longitude:this.longitude
      });
      this.showMessage=false;
    });
  
    geocoder.on('clear', () => {
      this.latitude = null;
      this.longitude = null;
      this.companyRegForm.patchValue({
        latitude:this.latitude,
        longitude:this.longitude
      });
    });
    
    
  }


}
