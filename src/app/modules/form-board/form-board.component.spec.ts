import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBoardComponent } from './form-board.component';

describe('FormBoardComponent', () => {
  let component: FormBoardComponent;
  let fixture: ComponentFixture<FormBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
