import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgxSelectBase } from '../NgxSelectBase';

@Component({
  selector: 'ngx-select-multiple',
  styleUrl: './ngx-select-multiple.component.scss',
  templateUrl: './ngx-select-multiple.component.html',
})
export class NgxSelectMultipleComponent extends NgxSelectBase {
  @Input({ alias: "items", required: true}) override items: any[] = [];

  @Input({ alias: "selectedItems" }) selectedItems: any[] = [];
  @Output() selectedItemsChange = new EventEmitter<any>();

  @Input({ alias: "key", required: false}) key: string = 'id';
  @Input({ alias: "value", required: false}) value: string = 'name';

  @Input({ alias: "placeholder", required: true }) placeholder?: string;
  @Input({ alias: "searchParam", required: false }) override searchParam: string = 'name';
  
  @ViewChild('contentRef', {static: false }) override contentRef!: ElementRef;
  
  constructor(override elementRef: ElementRef, override cdRef: ChangeDetectorRef) {
    super(elementRef, cdRef);
  }

  @HostListener('document:mousedown', ['$event'])
  onDisableDropdown(event: MouseEvent) {
    super.disableDropdown(event);
  }

  @HostListener('document:keydown.escape', ['$event']) 
  keydownHandler(event: KeyboardEvent) {
    super.onKeydownHandler(event);
  }

  onChecked(item: any) {
    if (!this.selectedItems) {
      this.selectedItems = [];
    }

    if (this.getSelected(item)) {
      this.selectedItems = this.selectedItems.filter((x: any) => x[this.key] !== item[this.key]);
    } else {
      this.selectedItems.push(item);
    }

    this.selectedItemsChange.emit(this.selectedItems);
  }

  getSelected(item: any) {
    return this.selectedItems?.find((x: any) => x[this.key] === item[this.key]);
  }

  clearSelectedOption() {
    this.selectedItems = [];
    this.selectedItemsChange.emit(null);
  }
}
