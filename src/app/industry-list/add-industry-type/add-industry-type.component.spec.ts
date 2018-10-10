import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndustryTypeComponent } from './add-industry-type.component';

describe('AddIndustryTypeComponent', () => {
  let component: AddIndustryTypeComponent;
  let fixture: ComponentFixture<AddIndustryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndustryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIndustryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
