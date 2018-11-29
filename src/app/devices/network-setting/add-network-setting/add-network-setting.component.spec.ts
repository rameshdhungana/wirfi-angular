import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNetworkSettingComponent } from './add-network-setting.component';

describe('AddNetworkSettingComponent', () => {
  let component: AddNetworkSettingComponent;
  let fixture: ComponentFixture<AddNetworkSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNetworkSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNetworkSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
