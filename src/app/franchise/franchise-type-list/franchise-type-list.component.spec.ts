import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseTypeListComponent } from './franchise-type-list.component';

describe('FranchiseTypeListComponent', () => {
  let component: FranchiseTypeListComponent;
  let fixture: ComponentFixture<FranchiseTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
