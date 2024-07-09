import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink,Router } from '@angular/router';
@Component({
  selector: 'app-company-dashboard',
  standalone: true,
  imports: [HttpClientModule,RouterLink],
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css'
})
export class CompanyDashboardComponent {

}
