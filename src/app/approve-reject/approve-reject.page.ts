import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(public generalService: GeneralService, private router: Router, private activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
    this.userRole = this.activatedRoute.snapshot.paramMap.get('userType')
  }
  segmentChanged(e) {
    console.log(this.segment)
    // this.segment = e
  }

  selectCard(i) {
    if (this.userRole == 3) {
      this.requests[i].selected = this.requests[i].selected == true ? false : true;
    } else {
      var isReadOnly = true;
      this.router.navigateByUrl('/add-travel-reqeust/' + isReadOnly);
    }
  }
}
