import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgxSelectModule } from "../../controls/ngx-select/ngx-select.module";

@Component({
  selector: 'app-ngx-select-timer',
  standalone: true,
  imports: [NgxSelectModule],
  templateUrl: './ngx-select-timer.component.html',
  styleUrl: './ngx-select-timer.component.scss'
})
export class NgxSelectTimerComponent implements OnChanges {

  @Input({ alias: 'startTime', required: true }) startTime?: string;
  @Input({ alias: 'endTime', required: true }) endTime?: string;
  @Input({ alias: 'disabled', required: false }) disabled: boolean = false;
  @Input({ alias: 'selectedTime', required: true }) selectedTime?: string;
  @Output() selectedTimeChange = new EventEmitter<any>();

  timerList: any[] = [];
  selectedTimer: any;

  initComponent() {
    if (this.startTime && this.endTime) {
      this.generateTimeList('30', this.startTime, this.endTime);
    }
    this.selectedTimer = this.timerList.find((t) => t.time == this.selectedTime);
    if (!this.selectedTimer) {
      this.selectedTimer = this.timerList[0] || undefined;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initComponent();
  }

  selectedItemChange(event: any) {
    let time = this.selectedTime;;
    if (event) {
      time = event.time;
    }
    this.selectedTimeChange.emit(time);
  }

  generateTimeList(step: string, startTime = "", endTime = ""): any {
    this.timerList = [];
    if (!step) {
      return [];
    }
    const parsedSlotSize = parseInt(step.toString(), 10);
    let startMinutes = startTime ? this.minutesPassed(startTime) : 0;
    let endMinutes = endTime ? this.minutesPassed(endTime) : 0;
    if (startMinutes > endMinutes) {
      this.generateTimeList2(step, startTime, endTime);
    }
    else {
      for (let i = startMinutes; i <= endMinutes; i += parsedSlotSize) {
        this.timerList.push({
          minutes: i,
          time: this.convertMinutesToTimeFormat(i),
          value: this.formatTime(this.convertMinutesToTimeFormat(i)),
        });
      }
    }
  }

  generateTimeList2(step: string, startTime = "", endTime = ""): any {
    this.timerList = [];
    if (!step) {
      return [];
    }
    const parsedSlotSize = parseInt(step.toString(), 10);
    let st = startTime.split(':').map((value: any) => parseInt(value, 10));
    let et = endTime.split(':').map((value: any) => parseInt(value, 10));
    let startDateTime = new Date();
    startDateTime.setHours(st[0], st[1], st[2]);
    let endDateTime = new Date();
    if(et[0] < st[0]) {
      endDateTime.setDate(startDateTime.getDate() + 1);
    }
    endDateTime.setHours(et[0], et[1], et[2]);
    let i = startDateTime;
    while (i <= endDateTime) {
      this.timerList.push({
        minutes: i.getHours() * 60 + i.getMinutes(),
        time: this.convertMinutesToTimeFormat(i.getHours() * 60 + i.getMinutes()),
        value: this.formatTime(this.convertMinutesToTimeFormat(i.getHours() * 60 + i.getMinutes())),
      });
      i.setMinutes(i.getMinutes() + parsedSlotSize);
    }
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
