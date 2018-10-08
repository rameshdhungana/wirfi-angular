import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFranchiseTypeComponent } from './add-franchise-type.component';

describe('AddFranchiseTypeComponent', () => {
  let component: AddFranchiseTypeComponent;
  let fixture: ComponentFixture<AddFranchiseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFranchiseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFranchiseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
