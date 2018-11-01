import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNetworkSettingComponent } from './delete-network-setting.component';

describe('DeleteNetworkSettingComponent', () => {
  let component: DeleteNetworkSettingComponent;
  let fixture: ComponentFixture<DeleteNetworkSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteNetworkSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNetworkSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
