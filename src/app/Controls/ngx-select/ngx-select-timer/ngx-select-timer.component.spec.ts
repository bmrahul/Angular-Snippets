import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectTimerComponent } from './ngx-select-timer.component';

describe('NgxSelectTimerComponent', () => {
  let component: NgxSelectTimerComponent;
  let fixture: ComponentFixture<NgxSelectTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectTimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxSelectTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
