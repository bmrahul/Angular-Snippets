import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectMultipleComponent } from './ngx-select-multiple.component';

describe('NgxSelectMultipleComponent', () => {
  let component: NgxSelectMultipleComponent;
  let fixture: ComponentFixture<NgxSelectMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectMultipleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
