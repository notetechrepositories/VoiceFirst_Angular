import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  CreateAccountView:boolean=true;

  constructor(private router:Router){}

  onRegNext(){
    this.CreateAccountView=false;
  }
  onRegBack(){
    this.CreateAccountView=true;
  }
  goToRegister(){
    this.router.navigate(['/registrationpage']);
  }
}
