import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-travel-request',
  templateUrl: './my-travel-request.page.html',
  styleUrls: ['./my-travel-request.page.scss'],
})
export class MyTravelRequestPage implements OnInit {
  segment = "pending";
  requests = [
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
  ]
  constructor() { }

  ngOnInit() {
  }
  segmentChanged(e) {
    console.log(this.segment)
    // this.segment = e
  }

}
