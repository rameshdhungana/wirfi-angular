import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepDeviceComponent } from './sleep-device.component';

describe('SleepDeviceComponent', () => {
  let component: SleepDeviceComponent;
  let fixture: ComponentFixture<SleepDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
