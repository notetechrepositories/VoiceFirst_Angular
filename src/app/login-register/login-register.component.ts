import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { FormsModule,Validators,ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { BrowserService } from '../services/browser.service';


@Component({
  selector: 'app-login-register',
  standalone: true,
  providers: [AuthService,BrowserService],
  imports: [RouterLink,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  CreateAccountView:boolean=true;

  loginForm!:FormGroup

  warningMsg:boolean=false ;

  constructor(private router:Router,
              private fb:FormBuilder,
              private authService:AuthService,
              private browserService:BrowserService
              ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onRegNext(){
    this.CreateAccountView=false;
  }
  onRegBack(){
    this.CreateAccountView=true;
  }
  goToRegister(){
    this.router.navigate(['/registrationpage']);
  }

  onLogin(){
    this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.browserService.setItem('accessToken',res.data);
        location.reload();
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}
