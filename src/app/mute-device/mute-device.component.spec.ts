import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuteDeviceComponent } from './mute-device.component';

describe('MuteDeviceComponent', () => {
  let component: MuteDeviceComponent;
  let fixture: ComponentFixture<MuteDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuteDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuteDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
