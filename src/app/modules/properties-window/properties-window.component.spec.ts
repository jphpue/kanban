import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesWindowComponent } from './properties-window.component';

describe('PropertiesWindowComponent', () => {
  let component: PropertiesWindowComponent;
  let fixture: ComponentFixture<PropertiesWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
