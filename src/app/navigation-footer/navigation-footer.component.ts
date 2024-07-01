import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SuperadminCompanydetailsComponent } from "../superadmin-companydetails/superadmin-companydetails.component";
import { CompanyBranchdetailsComponent } from "../company-branchdetails/company-branchdetails.component";





@Component({
    selector: 'app-navigation-footer',
    standalone: true,
    templateUrl: './navigation-footer.component.html',
    styleUrl: './navigation-footer.component.css',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, SuperadminCompanydetailsComponent, CompanyBranchdetailsComponent]
})
export class NavigationFooterComponent {

    customer:boolean=true;

   constructor(private router:Router){}

   goToLogin(){
    this.router.navigate(['/login-register']);
   }


}
