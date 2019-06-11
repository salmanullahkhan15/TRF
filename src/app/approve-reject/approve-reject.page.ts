import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

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
      selected: false
    },
    {
      id: 1,
      selected: false
    },
    {
      id: 1,
      selected: false
    },
    {
      id: 1,
      selected: false
    },
    {
      id: 1,
      selected: false
    },
    {
      id: 1,
      selected: false
    },
    {
      id: 1,
      selected: false
    },
    {
      id: 1,
      selected: false
    },
  ]
  userRole: any;
  constructor(public generalService: GeneralService) { }

  ngOnInit() {
    this.userRole = this.generalService.userTypeGlobal
  }
  segmentChanged(e) {
    console.log(this.segment)
    // this.segment = e
  }

  selectCard(i) {

    this.requests[i].selected = this.requests[i].selected == true ? false : true;
  }
}
