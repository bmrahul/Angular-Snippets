import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'rs-month-calendar',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './month-calendar.component.scss',
  templateUrl: './month-calendar.component.html',
})
export class MonthCalendarComponent implements OnInit {

  date = new Date();
  dates: EventCalendarDate[] = [];
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() {
  }

  ngOnInit(): void {
    this.getCalendarDates(6, 2024);
  }

  getCalendarDates(month: number, year: number) {
    month = month - 1;
    let startDate = new Date(year, month, 1);
    let endDate = new Date(year, month + 1, 0);

    let dayOfWeek = startDate.getDay();
    let lastDateOfPreviosMonth = new Date(startDate.getFullYear(), month, 0);
    // prefill the days before the first day of the month
    for (let i = 0; i < dayOfWeek; i++) {
      this.dates.push(this.getEventCalendarDates(new Date(lastDateOfPreviosMonth.getFullYear(), lastDateOfPreviosMonth.getMonth(), lastDateOfPreviosMonth.getDate() - i), true));
    }
    this.dates.reverse();
    for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
      this.dates.push(this.getEventCalendarDates(new Date(new Date().getFullYear(), month, i)));
    }
    // postfill the days after the last day of the month
    let endDateDayOfWeek = endDate.getDay();
    for (let i = 1; i <= 6 - endDateDayOfWeek; i++) {
      this.dates.push(this.getEventCalendarDates(new Date(endDate.getFullYear(), endDate.getMonth(), i), true));
    }
  }

  getEventCalendarDates(date: Date, disabled: boolean = false): EventCalendarDate {
    return {
      date: date,
      disabled: disabled
    }
  }
}

export interface EventCalendarDate {
  date: Date;
  disabled: boolean;
}