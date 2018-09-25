import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIndustryTypeComponent } from './delete-industry-type.component';

describe('DeleteIndustryTypeComponent', () => {
  let component: DeleteIndustryTypeComponent;
  let fixture: ComponentFixture<DeleteIndustryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteIndustryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIndustryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
