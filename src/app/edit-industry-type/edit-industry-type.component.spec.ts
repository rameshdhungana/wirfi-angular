import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndustryTypeComponent } from './edit-industry-type.component';

describe('EditIndustryTypeComponent', () => {
  let component: EditIndustryTypeComponent;
  let fixture: ComponentFixture<EditIndustryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIndustryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIndustryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
