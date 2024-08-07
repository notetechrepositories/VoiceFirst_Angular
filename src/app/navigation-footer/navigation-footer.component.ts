import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { SuperadminCompanydetailsComponent } from "../superadmin-companydetails/superadmin-companydetails.component";
import { CompanyBranchdetailsComponent } from "../company-branchdetails/company-branchdetails.component";

import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserService } from '../services/browser.service';





@Component({
    selector: 'app-navigation-footer',
    standalone: true,
    templateUrl: './navigation-footer.component.html',
    styleUrl: './navigation-footer.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, SuperadminCompanydetailsComponent, CompanyBranchdetailsComponent,HttpClientModule],
    providers:[AuthService,BrowserService]
})
export class NavigationFooterComponent {

    customer:boolean=true;

    customerlogin:boolean=false;

    superadmin:boolean=false;

    companyadmin:boolean=false;

    acceessToken!:any;

    decodedToken:any;

   constructor(private router:Router,private authService:AuthService,private browserService:BrowserService){}

   ngOnInit(){
    this.acceessToken=this.browserService.getItem('accessToken');
    this.decodedToken = this.authService.decodeToken(this.acceessToken);
    console.log(this.decodedToken);
    
    if(this.acceessToken!=null){
        this.afterLogin()
    }
    else{
        this.customer=true; 
    }
   }

   afterLogin(){
    if(this.decodedToken.role=="EMPLOYEE"){
        this.customer=false;
        if(this.decodedToken.designation=="0"){
            this.superadmin=true;
            this.router.navigate(['/superadmin-dashboard']);
        }
        else if(this.decodedToken.designation=="1"){
            this.companyadmin=true;
            this.router.navigate(['/company-dashboard']);
            
        }
    }
    else{
        this.customer=true;
        this.customerlogin=true;
    }
   }


   goToLogin(){
    this.router.navigate(['/login-register']);
   }

   logout(){
    // this.authService.logout().subscribe({
    //     next:(res)=>{
    //         localStorage.clear();
    //         this.router.navigate(['']).then(() => {
    //             window.location.reload();
    //     });
    //     },
    //     error:(error)=>{
    //         console.log(error);
    //     }
    // })
        this.browserService.clear();
        this.router.navigate(['']).then(() => {
            window.location.reload();
        });
   }


}
