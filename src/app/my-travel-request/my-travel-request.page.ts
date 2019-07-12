import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { Storage } from '@ionic/storage';

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


  approvedForms: any = []
  pendingForms: any = []
  userName: any;
  constructor(private router: Router, public generalService: GeneralService, public localStorage: Storage) { }

  ngOnInit() {
    this.localStorage.get("user_detail")
      .then((res) => {
        this.userName = res[0].Usr_Name
        this.getUserApprovedForms(res[0].Usr_Name)
        this.getUserPendingForms(res[0].Usr_Name)
      })
  }
  segmentChanged(e) {
    console.log(this.approvedForms)
    // this.segment = e
  }

  gotoDetail(item) {
    // var isReadOnly = true;
    var isReadOnly = true
    var trfNum = item.TRFNum
    var isApproveBtn = false

    this.router.navigateByUrl('/add-travel-reqeust/' + isReadOnly + "/" + trfNum + "/" + isApproveBtn);
  }

  getUserApprovedForms(user) {
    this.generalService.getRequest(this.generalService.API_GET_USER_APPROVED_FORMS + user).then((res: any) => {
      console.log(res)
      if (res[0].Message == undefined) {

        for (let i = 0; i < res.length; i++) {
          res[i].PreferDateFrom = this.dateFormat(res[i].PreferDateFrom)
          res[i].PreferDateTo2 = this.dateFormat(res[i].PreferDateTo2)
          res[i].RequestedDate = this.dateFormat(res[i].RequestedDate)
        }

        this.approvedForms = res
      }

    })
  }


  getUserPendingForms(user) {
    this.generalService.getRequest(this.generalService.API_GET_USER_PENDING_FORMS + user).then((res: any) => {
      console.log(res)
      if (res[0].Message == undefined) {

        for (let i = 0; i < res.length; i++) {
          res[i].PreferDateFrom = this.dateFormat(res[i].PreferDateFrom)
          res[i].PreferDateTo2 = this.dateFormat(res[i].PreferDateTo2)
          res[i].RequestedDate = this.dateFormat(res[i].RequestedDate)
        }
        this.pendingForms = res
      }

    })
  }


  dateFormat(date) {
    var newDate = new Date(date)
    var year = newDate.getFullYear()
    var month = newDate.getMonth() + 1
    var day = newDate.getDate()
    return year + "-" + month + "-" + day
  }

}
