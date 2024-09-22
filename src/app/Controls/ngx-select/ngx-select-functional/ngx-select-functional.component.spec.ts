import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectFunctionalComponent } from './ngx-select-functional.component';

describe('NgxSelectFunctionalComponent', () => {
  let component: NgxSelectFunctionalComponent;
  let fixture: ComponentFixture<NgxSelectFunctionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectFunctionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxSelectFunctionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
