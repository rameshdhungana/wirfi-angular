import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFranchiseTypeComponent } from './delete-franchise-type.component';

describe('DeleteFranchiseTypeComponent', () => {
  let component: DeleteFranchiseTypeComponent;
  let fixture: ComponentFixture<DeleteFranchiseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFranchiseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFranchiseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
