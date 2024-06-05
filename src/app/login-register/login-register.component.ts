import { Component } from '@angular/core';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  CreateAccountView:boolean=true;

  onRegNext(){
    this.CreateAccountView=false;
  }
  onRegBack(){
    this.CreateAccountView=true;
  }
}
