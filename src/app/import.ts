
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [

    FormsModule,
    
    ButtonModule,
   
    DropdownModule,
  
    InputTextModule,
  
    TableModule,
   
    TagModule,
    
    ToastModule,
   
  ],
  exports: [
   
    FormsModule,
   
    ButtonModule,
   
    DropdownModule,
   
    InputTextModule,
   
    TableModule,
    
    TagModule,
   

    ToastModule,
  
  ],
  providers: [  ]
})
export class ImportsModule {}
