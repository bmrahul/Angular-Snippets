import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectSingleComponent } from './ngx-select-single.component';

describe('NgxSelectSingleComponent', () => {
  let component: NgxSelectSingleComponent;
  let fixture: ComponentFixture<NgxSelectSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectSingleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxSelectSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
