import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';

export class NgxSelectBase {
    items: any[] = [];
    searchParam?: string;
    searchInput?: string; // local variable bibds with ngModel
    contentRef!: ElementRef;
    isDropdownActive = false;

    constructor(
        protected elementRef: ElementRef,
        protected cdRef: ChangeDetectorRef
    ) {}

    showDropdown() {
        this.isDropdownActive = true;
        this.cdRef.detectChanges();
        this.contentRef.nativeElement.focus();
    }

    hideDropdown() {
        this.isDropdownActive = false;
        this.cdRef.detectChanges();
    }

    disableDropdown(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target) && this.isDropdownActive) {
            this.isDropdownActive = false;
        }
    }

    onKeydownHandler(event: KeyboardEvent) {
        this.isDropdownActive = false;
    }

    onSelect(item: any) {
        this.isDropdownActive = false;
    }
}
