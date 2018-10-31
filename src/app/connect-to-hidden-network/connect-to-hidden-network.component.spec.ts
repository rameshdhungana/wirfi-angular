import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToHiddenNetworkComponent } from './connect-to-hidden-network.component';

describe('ConnectToHiddenNetworkComponent', () => {
  let component: ConnectToHiddenNetworkComponent;
  let fixture: ComponentFixture<ConnectToHiddenNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectToHiddenNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectToHiddenNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
