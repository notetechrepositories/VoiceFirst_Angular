import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RegistrationpageComponent } from './registrationpage/registrationpage.component';
import { NavigationFooterComponent } from './navigation-footer/navigation-footer.component';

export const routes: Routes = [
    // {path:'login-register',component:LoginRegisterComponent},
    // {path:'navigation-footer',component:NavigationFooterComponent},
    // {path:'login-register',component:LoginRegisterComponent},
    {path:'register',component:RegistrationpageComponent}
];
