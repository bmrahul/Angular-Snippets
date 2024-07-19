import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  statusList: any[] = [
    {
      name: 'All Status',
      value: 'allStatus',
      count: 12,
    },
    {
      name: 'Draft',
      value: 'draft',
      count: 2,
    },
    {
      name: 'Notification Created',
      value: 'notificationCreated',
      count: 17,
    },
    {
      name: 'WO Created',
      value: 'woCreated',
      count: 10,
    },
    {
      name: 'WO Closed',
      value: 'woClosed',
      count: 9,
    },
    {
      name: 'Closed',
      value: 'closed',
      count: 3,
    },
  ];
  constructor() {}

  ngOnInit() {}

  getSelectedStatus(value: any) {
    console.log(value);
  }
}
