import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectPersonnelComponent } from './ngx-select-personnel.component';

describe('NgxSelectPersonnelComponent', () => {
  let component: NgxSelectPersonnelComponent;
  let fixture: ComponentFixture<NgxSelectPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectPersonnelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxSelectPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
