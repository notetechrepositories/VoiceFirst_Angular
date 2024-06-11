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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [

    TableModule,ToastModule,CommonModule,TagModule,DropdownModule,ButtonModule,InputTextModule,FormsModule,HttpClientModule,DialogModule,BrowserAnimationsModule
   
  ],
  exports: [
   
    TableModule,ToastModule,CommonModule,TagModule,DropdownModule,ButtonModule,InputTextModule,FormsModule,HttpClientModule,DialogModule,BrowserAnimationsModule
  
  ],
  providers: [  ]
})
export class ImportsModule {}
