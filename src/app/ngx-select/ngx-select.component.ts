import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select.component.html',
  styleUrls: ['./ngx-select.component.css'],
})
export class NgxSelectComponent implements OnInit {
  @Input({ alias: 'type', required: true }) type: any;
  @Input({ alias: 'items', required: true }) items: any;
  @Input({ alias: 'searchParam', required: true }) searchParam!: string;
  @Input({ alias: 'placeholder', required: true }) placeholder!: string;

  @ViewChild('search', { static: false }) search!: ElementRef;

  @Output() selectedValue = new EventEmitter<any>();

  _placeholder = '';
  checkedItemList: any[] = [];
  searchInput!: string;
  isDropdownActive = false;
  selection: any[] = [];

  constructor(
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._placeholder = this.placeholder;
    this.dataTransformation();
  }

  enableDropdown() {
    this.isDropdownActive = true;
    this.cdRef.detectChanges();
    this.search.nativeElement.focus();
  }

  @HostListener('document:mousedown', ['$event'])
  disableDropdown(event: MouseEvent): void {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.isDropdownActive
    ) {
      this.isDropdownActive = false;
      this.selectedValue.emit(this.selection);
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.isDropdownActive = false;
  }

  getSelected(item: any) {
    return this.selection.findIndex((s) => s.id === item.id) !== -1;
  }

  changeHandler(item: any, event: any) {
    const id = item.id;
    const index = this.selection.findIndex((u) => u.id === id);
    if (index === -1) {
      this.selection = [...this.selection, item];
    } else {
      this.selection = this.selection.filter((user) => user.id !== item.id);
    }
    if (this.selection.length > 1) {
      this.placeholder = `${this.selection[0].name} + ${
        this.selection.length - 1
      }`;
    } else if (this.selection.length == 1) {
      this.placeholder = this.selection[0].name;
    } else {
      this.placeholder = this._placeholder;
    }
  }

  private dataTransformation() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].id = i + 1;
    }
  }
}
