import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectEquipmentComponent } from './ngx-select-equipment.component';

describe('NgxSelectEquipmentComponent', () => {
  let component: NgxSelectEquipmentComponent;
  let fixture: ComponentFixture<NgxSelectEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSelectEquipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxSelectEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
