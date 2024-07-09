import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';
import { HomeComponent } from './home/home.component';
import { SuperadminDashboardComponent } from './superadmin-dashboard/superadmin-dashboard.component';
import { SuperadminCompanydetailsComponent } from './superadmin-companydetails/superadmin-companydetails.component';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { CompanyBranchdetailsComponent } from './company-branchdetails/company-branchdetails.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'login-register',component:LoginRegisterComponent},
    {path:'registrationpage',component:RegistrationpageComponent},
    {path:'customer-profile',component:CustomerProfileComponent},
    {path:'superadmin-dashboard',component:SuperadminDashboardComponent},
    {path:'superadmin-companydetails',component:SuperadminCompanydetailsComponent},
    {path:'company-dashboard',component:CompanyDashboardComponent},
    {path:'company-branchdetails',component:CompanyBranchdetailsComponent},
];
