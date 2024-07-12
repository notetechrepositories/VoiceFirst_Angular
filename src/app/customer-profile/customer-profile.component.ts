import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink,Router } from '@angular/router';
import { UserModel } from '../model/UserModel';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  providers: [UserService],
  imports: [HttpClientModule,RouterLink],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {

 userDetails=new UserModel();

  constructor(private userService:UserService){}

  ngOnInit(){
    this.getCustomerDetail();
  }
   
  getCustomerDetail(){
    this.userService.getCustomerDetails().subscribe({
        next:(res)=>{
          this.userDetails=res;
          console.log(this.userDetails);
          
        },
        error:(error)=>{
            console.log(error);
        }
    })
   }
}
