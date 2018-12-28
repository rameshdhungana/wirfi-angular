import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRouteComponent } from './plan-route.component';

describe('PlanRouteComponent', () => {
  let component: PlanRouteComponent;
  let fixture: ComponentFixture<PlanRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
