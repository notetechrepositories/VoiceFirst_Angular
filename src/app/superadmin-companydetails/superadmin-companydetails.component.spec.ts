import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminCompanydetailsComponent } from './superadmin-companydetails.component';

describe('SuperadminCompanydetailsComponent', () => {
  let component: SuperadminCompanydetailsComponent;
  let fixture: ComponentFixture<SuperadminCompanydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperadminCompanydetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperadminCompanydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
