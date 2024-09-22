import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DayCalendarComponent } from './day-calendar/day-calendar.component';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';

@Component({
  standalone: true,
  selector: 'rs-event-calendar',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './event-calendar.component.scss',
  templateUrl: './event-calendar.component.html',
  imports: [CommonModule, MonthCalendarComponent, WeekCalendarComponent, DayCalendarComponent],
})
export class EventCalendarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
