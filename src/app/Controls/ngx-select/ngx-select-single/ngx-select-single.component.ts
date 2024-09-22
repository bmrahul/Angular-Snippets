import { NgxSelectBase } from '../NgxSelectBase';
import { ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-select-single',
  styleUrl: './ngx-select-single.component.scss',
  templateUrl: './ngx-select-single.component.html',
})
export class NgxSelectSingleComponent extends NgxSelectBase {
  @Input({ alias: "items", required: true}) override items: any[] = [];

  @Input({ alias: "selectedItem", required: true}) selectedItem?: any;
  @Output() selectedItemChange = new EventEmitter<any>();
  @Output() onTextChange = new EventEmitter<any>();

  @Input({ alias: "key", required: false}) key: string = 'id';
  @Input({ alias: "value", required: false}) value: string = 'name';

  @Input({ alias: "chip", required: false}) chip: boolean = true;
  @Input({ alias: "placeholder", required: true }) placeholder?: string;
  @Input({ alias: "chevronRequired", required: false}) chevronRequired : boolean = true;
  @Input({ alias: "searchParam", required: false }) override searchParam: string = 'name';
  @Input({ alias: 'disabled', required: false }) disabled: boolean = false;
  
  @ViewChild('contentRef', {static: false }) override contentRef!: ElementRef;

  @ContentChild('itemList', {static: false}) itemListTemplateRef!: TemplateRef<any>;
  @ContentChild('display', {static: false}) displayTemplateRef!: TemplateRef<any>;
  
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

  override onSelect(item: any) {
    this.isDropdownActive = false;
    if(this.disabled)
      return;
    this.selectedItemChange.emit(item);
  }

  clearSelectedOption() {
    this.selectedItem = null;
    this.selectedItemChange.emit(null);
  }
  
  onInputChange(event: any) {
    this.onTextChange.emit(event);
  }
}
