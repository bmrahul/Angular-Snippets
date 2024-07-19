import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ng-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss'],
})
export class NgSelectComponent implements OnInit, OnChanges {
  @Input({ alias: 'items' }) items!: any;
  @Input({ alias: 'selectedOption' }) selectedOption!: any;
  @Input({ alias: 'searchParam' }) searchParam!: string;
  @Input({ alias: 'placeholder' }) placeholder!: string;
  @Input({ alias: 'type', required: true }) type?:
    | 'single'
    | 'multiple'
    | 'equipment'
    | 'functional'
    | 'pattern';

  @ViewChild('search', { static: false }) search!: ElementRef;

  @Output() selectedValue = new EventEmitter<any>();

  _placeholder = '';
  searchInput!: string;
  pageSize: number = 10;
  pageNumber: number = 1;
  isDropdownActive = false;

  /*--------Lists-------*/
  equipmentList: any[] = [];
  functionalList: any[] = [];

  /*--------Single Select Properties-------*/
  singleSelectItem: any = {};

  /*--------Multi Select Properties-------*/
  selection: any[] = [];
  checkedItemList: any[] = [];

  constructor(
    // private equipmentService: EquipmentService,
    private elementRef: ElementRef,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // if (this.type === 'equipment') {
    //   this.getEquipment();
    // } else if (this.type === 'functional') {
    //   this.getFunctional();
    // }
    this._placeholder = this.placeholder;
    if (
      this.type === 'single' ||
      this.type === 'multiple' ||
      this.type === 'pattern'
    ) {
      if (this.items?.length > 0) {
        this.dataTransformation();
        let option = this.items.filter(
          (item: any) => item.id === this.selectedOption
        );
        if (option.length > 0) {
          if (this.type === 'single' || this.type === 'pattern') {
            this._placeholder = option[0].name;
            this.selectSingleOption(option[0]);
          } else if (this.type === 'multiple') {
            this.selection = option;
            if (this.selection.length > 1) {
              this._placeholder = `${this.selection[0].name} + ${
                this.selection.length - 1
              }`;
            } else if (this.selection.length == 1) {
              this._placeholder = this.selection[0].name;
            } else {
              this._placeholder = this.placeholder;
            }
          }
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type === 'equipment') {
      this.onEdit(this.equipmentList);
    } else if (this.type === 'functional') {
      this.onEdit(this.functionalList);
    } else {
      this.onEdit(this.items);
    }
  }

  onEdit(items: any) {
    if (this.selectedOption !== undefined && this.selectedOption !== null) {
      let item = items.find((item: any) => item.id === this.selectedOption);
      this.selectSingleOption(item);
    } else {
      this.selection = [];
      this._placeholder = this.placeholder;
    }
  }

  showDropdown() {
    this.isDropdownActive = true;
    this.cdRef.detectChanges();
    if (
      this.type === 'single' ||
      this.type === 'multiple' ||
      this.type === 'pattern'
    ) {
      this.search.nativeElement.focus();
    }
  }

  hideDropdown() {
    this.isDropdownActive = false;
    this.cdRef.detectChanges();
  }

  @HostListener('document:mousedown', ['$event'])
  disableDropdown(event: MouseEvent): void {
    if (
      !this.elementRef.nativeElement.contains(event.target) &&
      this.isDropdownActive
    ) {
      this.isDropdownActive = false;
      if (this.selection.length > 1) {
        this.selectedValue.emit(this.selection);
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.isDropdownActive = false;
  }

  getSelected(item: any) {
    return this.selection.findIndex((s) => s.id === item.id) !== -1;
  }

  selectMultipleOption(item: any, event: any) {
    const id = item.id;
    const index = this.selection.findIndex((u) => u.id === id);
    if (index === -1) {
      this.selection = [...this.selection, item];
    } else {
      this.selection = this.selection.filter((user) => user.id !== item.id);
    }
    if (this.selection.length > 1) {
      this._placeholder = `${this.selection[0].name} + ${
        this.selection.length - 1
      }`;
    } else if (this.selection.length == 1) {
      this._placeholder = this.selection[0].name;
    } else {
      this._placeholder = this.placeholder;
    }
  }

  selectSingleOption(item: any) {
    if (item !== null) {
      this.selection = [];
      this._placeholder = item?.name;
      this.isDropdownActive = false;
      this.selection.push(item);
      this.selectedValue.emit(this.selection[0]);
    } else {
      this._placeholder = this.placeholder;
      this.selection = [];
    }
  }

  clearSelectedOption() {
    this.selection = [];
    this._placeholder = this.placeholder;
    this.selectedValue.emit({});
  }

  private dataTransformation() {
    if (
      this.type === 'single' ||
      this.type === 'multiple' ||
      this.type === 'pattern'
    ) {
      if (
        this.items[0].id === '' ||
        this.items[0].id === null ||
        this.items[0].id === undefined
      ) {
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].id = i + 1;
        }
      }
    }
  }

  searchValue(event: any) {
    this.isDropdownActive = true;
    if (event.target.value.length % 3 === 0 || event.target.value.length > 6) {
      // if (this.type === 'equipment') {
      //   this.getEquipment(event.target.value);
      // }
      // if (this.type === 'functional') {
      //   this.getFunctional(event.target.value);
      // }
    }
  }

  // getEquipment(filterParam: string = '') {
  //   this.equipmentService.getEquipment(this.pageNumber, this.pageSize, filterParam).subscribe({
  //     next: (response) => {
  //       this.equipmentList = response.data;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }

  // getFunctional(filterParam: string = '') {
  //   this.equipmentService.getFunctionLocation(this.pageNumber, this.pageSize, filterParam).subscribe({
  //     next: (response) => {
  //       this.functionalList = response.data;
  //       if (this.selectedOption !== undefined && this.selectedOption !== null) {
  //         this.singleSelectItem = this.functionalList.find((item: any) => item.id === this.selectedOption);
  //         this.selectSingleOption(this.singleSelectItem);
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }
}
