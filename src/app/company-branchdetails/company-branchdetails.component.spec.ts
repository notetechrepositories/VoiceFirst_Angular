import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBranchdetailsComponent } from './company-branchdetails.component';

describe('CompanyBranchdetailsComponent', () => {
  let component: CompanyBranchdetailsComponent;
  let fixture: ComponentFixture<CompanyBranchdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBranchdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBranchdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
