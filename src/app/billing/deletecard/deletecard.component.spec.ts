import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecardComponent } from './deletecard.component';

describe('DeletecardComponent', () => {
  let component: DeletecardComponent;
  let fixture: ComponentFixture<DeletecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
