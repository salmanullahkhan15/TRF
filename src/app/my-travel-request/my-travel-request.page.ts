import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit() {
  }
  segmentChanged(e) {
    console.log(this.segment)
    // this.segment = e
  }

  gotoDetail() {
    var isReadOnly = true;
    this.router.navigateByUrl('/add-travel-reqeust/' + isReadOnly);
  }

}
