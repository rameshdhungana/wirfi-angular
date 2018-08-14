import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecardComponent } from './updatecard.component';

describe('UpdatecardComponent', () => {
  let component: UpdatecardComponent;
  let fixture: ComponentFixture<UpdatecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
