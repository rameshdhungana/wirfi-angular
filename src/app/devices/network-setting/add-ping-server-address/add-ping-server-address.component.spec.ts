import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPingServerAddressComponent } from './add-ping-server-address.component';

describe('AddPingServerAddressComponent', () => {
  let component: AddPingServerAddressComponent;
  let fixture: ComponentFixture<AddPingServerAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPingServerAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPingServerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
