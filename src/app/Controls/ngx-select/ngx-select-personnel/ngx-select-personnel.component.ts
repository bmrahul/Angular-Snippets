import { CommonModule } from '@angular/common';
import { NgxSelectModule } from '../../controls/ngx-select/ngx-select.module';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NopictureComponent } from '../nopicture/nopicture.component';

@Component({
  standalone: true,
  imports: [CommonModule, NgxSelectModule, NopictureComponent],
  selector: 'ngx-select-personnel',
  template: `
    <ngx-select-single [items]="items" [placeholder]="'Select person'" [(selectedItem)]="selectedItem" (selectedItemChange)="onSelect($event)" [searchParam]="'name'">
      <ng-template #display let-selectedItem>
        <div class="d-flex">
            <div class="equip-image d-flex justify-content-start align-items-center" *ngIf="selectedItem">
              <img class="equip-img" [src]="'data:image/png;base64,' + selectedItem?.image" [alt]="selectedItem?.name" *ngIf="selectedItem?.image != null">
              <div class="equip-img" *ngIf="selectedItem?.image == null">
                <app-nopicture [FirstName]="selectedItem?.firstName" [LastName]="selectedItem?.lastName" [size]="'30px'" [textsize]="'14px'"></app-nopicture>
              </div>
            </div>
            <div class="equip-details d-flex flex-column">
              <span class="equip-name">{{selectedItem?.name}}</span>
              <span class="equip-description ellipsis">{{selectedItem?.persona}}</span>
            </div>
        </div>
      </ng-template>
      <ng-template #itemList let-item>
          <div class="equip-image d-flex justify-content-start align-items-center">
            <img class="equip-img" [src]="'data:image/png;base64,' + item.image" [alt]="item.name" *ngIf="item.image != null">
            <div class="equip-img" *ngIf="item.image == null">
              <app-nopicture [FirstName]="item.firstName" [LastName]="item.lastName" [size]="'30px'" [textsize]="'14px'"></app-nopicture>
            </div>
          </div>
          <div class="equip-details d-flex flex-column">
            <span class="equip-name">{{item.name}}</span>
            <span class="equip-description ellipsis">{{item.persona}}</span>
          </div>
      </ng-template>
    </ngx-select-single>
  `,
})
export class NgxSelectPersonnelComponent {
  @Input({ alias: "items", required: true}) items: any[] = [];

  @Input({ alias: "selectedItem" }) selectedItem?: any;
  @Output() selectedItemChange = new EventEmitter<any>();

  onSelect(event: any) {
    this.selectedItem = event;
    this.selectedItemChange.emit(event);
  }
}