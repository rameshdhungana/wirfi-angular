import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlashUrlComponent } from './slash-url.component';

describe('SlashUrlComponent', () => {
  let component: SlashUrlComponent;
  let fixture: ComponentFixture<SlashUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlashUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlashUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
