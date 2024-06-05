import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';
import { NavigationFooterComponent } from './navigation-footer/navigation-footer.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'login-register',component:LoginRegisterComponent},
    {path:'registrationpage',component:RegistrationpageComponent}
];
