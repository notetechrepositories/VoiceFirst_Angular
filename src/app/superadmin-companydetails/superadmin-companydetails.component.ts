import { Component } from '@angular/core';
import { CompanyService } from '../services/company.service';
import { CompanyModel } from '../model/CompanyModel';
import { MessageService} from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http'; 



@Component({
  selector: 'app-superadmin-companydetails',
  standalone: true,
  imports: [TableModule,ToastModule,CommonModule,TagModule,DropdownModule,ButtonModule,InputTextModule,FormsModule,HttpClientModule,DialogModule],
  providers: [MessageService, CompanyService],
  templateUrl: './superadmin-companydetails.component.html',
  styleUrl: './superadmin-companydetails.component.css'
})
export class SuperadminCompanydetailsComponent {


  company!: CompanyModel[];

  companyListView:boolean=true;
  AddCompanyvisible:boolean=false;

  constructor(private companyService: CompanyService, private messageService: MessageService) {}

  ngOnInit() {
    this.getCompanyDetails();
  }

  getCompanyDetails(){
    this.companyService.getCompantDetails().subscribe({
      next:(res)=>{
        this.company=res;
        console.log(this.company);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  getStatusLabel(status: number) {
    return status === 1 ? 'APPROVED' : 'UNAPPROVED';
  }

  getSeverityisApproved(status: number) {
    return status === 1 ? 'success' : 'warning';
  }

  getSeverityisActive(status: number) {
    return status === 1 ? 'success' : 'danger';
  }

  onCompanyView(){
    this.companyListView=false;
  }

  showAddCompanyDialog(){
    this.AddCompanyvisible=true;
  }
  onCompanyback(){
    this.companyListView=true;
  }
}

