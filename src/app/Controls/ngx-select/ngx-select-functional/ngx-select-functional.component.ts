import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EquipmentService } from '../../services/equipment/equipment.service';

@Component({
  selector: 'ngx-select-functional',
  template: `
    <ngx-select-single [items]="functionalLocations" [placeholder]="'Select functional location'" [(selectedItem)]="selectedItem" (selectedItemChange)="onSelect($event)" (onTextChange)="onTextChange($event)" [searchParam]="'name'">
      <ng-template #display let-selectedItem>
        <div class="d-flex">
            <div class="equip-details d-flex flex-column">
                <span class="equip-name">{{selectedItem?.name}}</span>
                <span class="equip-description ellipsis">{{selectedItem?.description}}</span>
            </div>
        </div>
      </ng-template>
      <ng-template #itemList let-item>
          <div class="equip-details d-flex flex-column">
              <span class="equip-name">{{item.name}}</span>
              <span class="equip-description ellipsis">{{item.description}}</span>
          </div>
      </ng-template>
    </ngx-select-single>
  `,
})
export class NgxSelectFunctionalComponent {
  @Input({ alias: "items", required: false}) items?: any[];

  @Input({ alias: "selectedItem" }) selectedItem?: any;
  @Output() selectedItemChange = new EventEmitter<any>();
  
  functionalLocations: any[] = [];
  
  constructor(private equipmentService: EquipmentService) { }
  
  ngOnInit(): void {
    if (!this.items) {
      this.equipmentService.getFunctionLocation(1, 10, '').subscribe((res: any) => {
        this.functionalLocations = res.data || [];
      });
    }
    else {
      this.functionalLocations = [...this.items] || [];
    }
  }
  onSelect(event: any) {
    this.selectedItem = event;
    this.selectedItemChange.emit(event);
  }

  onTextChange(event: any) {
    if(event && event.length < 4) return;
    this.equipmentService.getFunctionLocation(1, 10, event).subscribe((res: any) => {
      this.functionalLocations = res.data || [];
    });
  }
}