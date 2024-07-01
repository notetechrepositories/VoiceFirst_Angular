import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { BranchModel } from '../model/BranchModel';
import { FormsModule,FormControl,Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BranchService } from '../services/branch.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
import { log } from 'console';

declare var bootstrap: any;

@Component({
  selector: 'app-company-branchdetails',
  standalone: true,
  providers: [ConfirmationService,MessageService,BranchService],
  imports: [TagModule,ToastModule,TableModule,FormsModule,CommonModule,HttpClientModule,ConfirmPopupModule],
  templateUrl: './company-branchdetails.component.html',
  styleUrl: './company-branchdetails.component.css'
})
export class CompanyBranchdetailsComponent {

  branch!:BranchModel[];

  branchId!:number;

  constructor(private branchService:BranchService,
              private confirmationService:ConfirmationService,
              private messageService:MessageService
             ){}

  ngOnInit(){
    this.getBranchByCompanyId()
  }

  closeModal() {
    const modalElement = document.getElementById('statusChangeModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  getBranchByCompanyId(){
    this.branchService.getBranchByCompanyId(3).subscribe({
      next:(res)=>{
        console.log(res);
        this.branch=res;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  getStatusLabel(status: number) {
    return status === 1 ? 'ACTIVE' : 'INACTIVE';
  }

  getSeverityisActive(status: number) {
    return status === 1 ? 'success' : 'danger';
  }

  onstatusClick(id:number){
    this.branchId=id;
  }

  onStatusChange(status:number){
    // this.companyService.updateStatusBySuperadmin(this.companyId,status).subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //     const company = this.company.find(c => c.company_id === this.companyId);
    //     if (company) {
    //       if(status==1){
    //         company.status = "DECLINED";
    //       }
    //       else if(status==0){
    //         company.status="APPROVED";
    //       }
    //     }
    //   },
    //   error:(error)=>{
    //     console.log(error);
    //   }
    // })
  }
  onBranchView(id:number){

  }
  
  onRegister(){

  }

  confirm1(event: any) {
    console.log("Event Working");
    
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
}
}
