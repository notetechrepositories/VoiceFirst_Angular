import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { LoginRegisterComponent } from "../login-register/login-register.component";
import { RegistrationpageComponent } from "../registrationpage/registrationpage.component";
import { RouterModule, Routes } from '@angular/router';




@Component({
    selector: 'app-navigation-footer',
    standalone: true,
    templateUrl: './navigation-footer.component.html',
    styleUrl: './navigation-footer.component.css',
    imports: [HomeComponent, LoginRegisterComponent, RegistrationpageComponent,RouterModule]
})
export class NavigationFooterComponent {

    constructor(){}


}
