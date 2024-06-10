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
import { ImportsModule } from '../import';



export interface SelectItem<T = any> {
  label?: string;
  value: T;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}
@Component({
  selector: 'app-superadmin-companydetails',
  standalone: true,
  imports: [TableModule,ToastModule,CommonModule,TagModule,DropdownModule,ButtonModule,InputTextModule,FormsModule],
  providers: [MessageService, CompanyService],
  templateUrl: './superadmin-companydetails.component.html',
  styleUrl: './superadmin-companydetails.component.css'
})
export class SuperadminCompanydetailsComponent {
  products!: CompanyModel[];

  statuses!: SelectItem[];

  clonedProducts: { [s: string]: CompanyModel } = {};

  constructor(private companyService: CompanyService, private messageService: MessageService) {}

  ngOnInit() {
      this.companyService.getProductsMini().then((data) => {
          this.products = data;
      });

      this.statuses = [
          { label: 'In Stock', value: 'INSTOCK' },
          { label: 'Low Stock', value: 'LOWSTOCK' },
          { label: 'Out of Stock', value: 'OUTOFSTOCK' }
      ];
  }

  onRowEditInit(product: CompanyModel) {
      this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: CompanyModel) {
      if (product.price > 0) {
          delete this.clonedProducts[product.id as string];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
      } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
      }
  }

  onRowEditCancel(product: CompanyModel, index: number) {
      this.products[index] = this.clonedProducts[product.id as string];
      delete this.clonedProducts[product.id as string];
  }

  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warning';
        case 'OUTOFSTOCK':
            return 'danger';
        default:
            return 'info';  // Default case added
    }
}

}
