import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-reject',
  templateUrl: './approve-reject.page.html',
  styleUrls: ['./approve-reject.page.scss'],
})
export class ApproveRejectPage implements OnInit {
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
