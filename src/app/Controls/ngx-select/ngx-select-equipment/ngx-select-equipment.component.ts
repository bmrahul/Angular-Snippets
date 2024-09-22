import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EquipmentService } from '../../services/equipment/equipment.service';

@Component({
  selector: 'ngx-select-equipment',
  template: `
    <ngx-select-single [items]="equipments" [placeholder]="'Select Equipment'" [(selectedItem)]="selectedItem" (selectedItemChange)="onSelect($event)" (onTextChange)="onTextChange($event)" [searchParam]="'name'">
      <ng-template #display let-selectedItem>
        <div class="d-flex">
          <div class="equip-image d-flex justify-content-start align-items-center" *ngIf="selectedItem">
            <app-equipment-image [equipment]="selectedItem" [isEditable]="false"></app-equipment-image>
          </div>
          <div class="equip-details d-flex flex-column">
            <span class="equip-name">{{selectedItem?.name}}</span>
            <span class="equip-description ellipsis">{{selectedItem?.description}}</span>
          </div>
        </div>
      </ng-template>
      <ng-template #itemList let-item>
        <div class="equip-image d-flex justify-content-start align-items-center">
          <app-equipment-image [equipment]="selectedItem" [isEditable]="false"></app-equipment-image>
        </div>
        <div class="equip-details d-flex flex-column">
          <span class="equip-name">{{item.name}}</span>
          <span class="equip-description ellipsis">{{item.description}}</span>
        </div>
      </ng-template>
    </ngx-select-single>
  `,
  styles: [`
    .equip-image {
      width: 40px;
      margin-right: 10px;
      border-radius: 100%;
    }`
  ]
})
export class NgxSelectEquipmentComponent implements OnInit {
  @Input({ alias: "items", required: false }) items?: any[];
  @Input({ alias: "selectedItem" }) selectedItem?: any;
  @Output() selectedItemChange = new EventEmitter<any>();

  equipments: any[] = [];
  constructor(private equipmentService: EquipmentService) { }
  
  ngOnInit(): void {
    if (!this.items) {
      this.equipmentService.getEquipment(1, 10, '').subscribe((res: any) => {
        this.equipments = res.data || [];
      });
    }
    else {
      this.equipments = [...this.items] || [];
    }
  }

  onSelect(event: any) {
    this.selectedItem = event;
    this.selectedItemChange.emit(event);
  }

  onTextChange(event: any) {
    if(event && event.length < 4) return;
    this.equipmentService.getEquipment(1, 10, event).subscribe((res: any) => {
      this.equipments = res.data || [];
    });
  }
}