import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule, Time } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { end } from '@popperjs/core';

@Component({
  standalone: true,
  selector: 'ngx-timer',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './ngx-timer.component.scss',
  templateUrl: './ngx-timer.component.html',
  imports: [CommonModule, FormsModule, DropdownModule, NgPipesModule],
})

export class NgxTimerComponent implements OnInit {
  @Input({ alias: "startTime" }) startTime!: any; // hh:mm:ss
  @Input({ alias: "endTime" }) endTime!: any; // hh:mm:ss
  @Input({ alias: "placeholder" }) placeholder!: string;
  @Input({ alias: "selectedOption" }) selectedOption!: Time;
  @Input({ alias: "isActive" }) isActive!: boolean;

  @ViewChild('search', {static: false }) search!: ElementRef;

  @Output() selectedValue = new EventEmitter<any>(); // hh:mm:ss

  _placeholder = "";
  selectedTime: any;
  timerList: any[] = [];
  searchInput: string = "";
  isDropdownActive: boolean = false;

  constructor(private elementRef: ElementRef, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._placeholder = this.placeholder;
    this.generateTimeList("60", this.startTime, this.endTime);
  }

  showDropdown() {
    this.isDropdownActive = true;
    this.cdRef.detectChanges();
    this.search.nativeElement.focus();
  }

  hideDropdown() {
    this.isDropdownActive = false;
    this.cdRef.detectChanges();
  }

  @HostListener('document:mousedown', ['$event'])
  disableDropdown(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isDropdownActive) {
      this.isDropdownActive = false;
      if (this.selectedTime && this.selectedTime.time) {
        this.selectedValue.emit(this.selectedTime);
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    this.isDropdownActive = false;
  }

  clearSelectedOption() {
    this.selectedTime = null;
    this.selectedValue.emit(null);
  }

  onSelectOption(item: any, event: any) {
    this.selectedTime = item;
    this._placeholder = item?.value;
    this.selectedValue.emit(item);
    this.hideDropdown();
  }

  generateTimeList(step: string, startTime = "", endTime = ""): any {
    if (!step) {
      return [];
    }
    let startMinutes = startTime ? this.minutesPassed(startTime) : 0;
    let endMinutes = endTime ? this.minutesPassed(endTime) : 0;
    if (startMinutes > endMinutes) {
      let temp = startMinutes;
      startMinutes = endMinutes;
      endMinutes = temp;
    }
    const parsedSlotSize = parseInt(step.toString(), 10);
    for (let i = startMinutes; i <= endMinutes; i += parsedSlotSize) {
      this.timerList.push({
        minutes: i,
        time: this.convertMinutesToTimeFormat(i),
        value: this.formatTime(this.convertMinutesToTimeFormat(i)),
      });
    }
    return [...this.timerList];
  }

  minutesPassed(time: string) {
    const [hour, minutes] = time.split(':').map((value: any) => parseInt(value, 10));
    return hour * 60 + minutes;
  }

  public convertMinutesToTimeFormat(mins: number) {
    let h: string | number = Math.floor(mins / 60);
    let m: string | number = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}:00`;
  }
  
  formatTime(time: string) {
    const H = +time.substr(0, 2);
    const h = H % 12 || 12;
    const ampm = (H < 12 || H === 24) ? " AM" : " PM";
    return h + time.substr(2, 3) + ampm;
  }
}
