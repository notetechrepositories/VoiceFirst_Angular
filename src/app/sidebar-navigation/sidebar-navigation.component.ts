import { Component } from '@angular/core';
import { CompanyDashboardComponent } from "../company-dashboard/company-dashboard.component";
import { SuperadminCompanydetailsComponent } from "../superadmin-companydetails/superadmin-companydetails.component";
import { SuperadminDashboardComponent } from "../superadmin-dashboard/superadmin-dashboard.component";


@Component({
    selector: 'app-sidebar-navigation',
    standalone: true,
    templateUrl: './sidebar-navigation.component.html',
    styleUrl: './sidebar-navigation.component.css',
    imports: [CompanyDashboardComponent, SuperadminCompanydetailsComponent, SuperadminDashboardComponent]
})
export class SidebarNavigationComponent {

}
