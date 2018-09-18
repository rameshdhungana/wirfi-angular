import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePresetComponent } from './delete-preset.component';

describe('DeletePresetComponent', () => {
  let component: DeletePresetComponent;
  let fixture: ComponentFixture<DeletePresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePresetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
