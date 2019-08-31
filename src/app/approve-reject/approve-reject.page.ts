import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';
import { LoadingController } from '@ionic/angular';

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
  listType: any;
  userName: any;
  approvalRequests: any = []
  approvedRequests: any = []
  noRecordAl: boolean = false
  noRecordEd: boolean = false
  constructor(public generalService: GeneralService, private router: Router, private activatedRoute: ActivatedRoute, public localStorage: Storage,
    public location: Location,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    // this.userRole = this.activatedRoute.snapshot.paramMap.get('userType')


    // console.log(this.userRole)

    // this.localStorage.get("user_detail")
    //   .then((res) => {
    //     this.userName = res[0].Usr_Name
    //     if (this.userRole == 2) {
    //       this.getCfoPendingList(res[0].Usr_Name)
    //       this.getCfoApproveList(res[0].Usr_Name)
    //     }

    //     if (this.userRole == 3) {
    //       this.getCEOPendingList(res[0].Usr_Name)
    //     }

    //     if (this.userRole == 4) {
    //       this.getHeadPendingList(res[0].Usr_Name)
    //       this.getHeadApproveList(res[0].Usr_Name)
    //     }

    //     this.generalService.userRole = this.userRole
    //   })

  }


  ionViewWillEnter() {
    this.initFunction()

  }


  initFunction() {
    console.log("asdfasfasdfasdfasdf");

    this.approvalRequests = []
    this.approvedRequests = []

    this.userRole = this.activatedRoute.snapshot.paramMap.get('userType')
    this.listType = this.activatedRoute.snapshot.paramMap.get('listType')


    // this.listType =

    this.segment = this.listType

    console.log(this.userRole)
    console.log(this.userRole)
    console.log(this.userRole)
    console.log(this.userRole)

    this.localStorage.get("user_detail")
      .then((res) => {
        this.userName = res[0].Usr_Name
        if (this.userRole == 2) {
          this.getCfoPendingList(res[0].Usr_Name)
          this.getCfoApproveList(res[0].Usr_Name)
        }

        if (this.userRole == 3) {
          this.getCEOPendingList(res[0].Usr_Name)
        }

        if (this.userRole == 4) {
          this.getHeadPendingList(res[0].Usr_Name)
          this.getHeadApproveList(res[0].Usr_Name)
        }

        this.generalService.userRole = this.userRole
      })

  }

  segmentChanged(e) {
    console.log(this.segment)
    // this.segment = e
  }

  selectCard(i, item) {
    if (this.userRole == 3 || this.userRole == 2) {
      this.approvalRequests[i].selected = this.approvalRequests[i].selected == true ? false : true;
    } else {
      var isReadOnly = true
      var readData = item.TRFNum
      var isApproveBtn = true
      this.approvalRequests[i].selected = true
      // var role = this.userRole == 3 ? "ceo" : this.userRole == 4 ? "cfo" : this.userRole == 2 ? "head"
      this.router.navigateByUrl('/add-travel-reqeust/' + isReadOnly + "/" + readData + "/" + isApproveBtn);
    }
  }


  async getHeadPendingList(user) {

    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();

    this.generalService.getRequest(this.generalService.API_GET_HEAD_APPROVAL_LIST + user).then((res: any) => {
      console.log(res)
      if (res[0].Message == undefined) {
        this.noRecordAl = false;

        for (let i = 0; i < res.length; i++) {
          res[i].PreferDateFrom = this.dateFormat(res[i].PreferDateFrom)
          res[i].PreferDateTo2 = this.dateFormat(res[i].PreferDateTo2)
          res[i].RequestedDate = this.dateFormatNoPlus(res[i].RequestedDate)
        }
        this.approvalRequests = res
      } else {
        this.noRecordAl = true;

      }
      loading.dismiss();
    })
  }


  async getCfoPendingList(user) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();
    this.generalService.getRequest(this.generalService.API_GET_CFO_APPROVAL_LIST).then((res: any) => {
      console.log(res[0].Message)
      console.log("salman")

      if (res[0].Message == undefined) {
        this.noRecordAl = false;

        for (let i = 0; i < res.length; i++) {
          res[i].PreferDateFrom = this.dateFormat(res[i].PreferDateFrom)
          res[i].PreferDateTo2 = this.dateFormat(res[i].PreferDateTo2)
          res[i].RequestedDate = this.dateFormatNoPlus(res[i].RequestedDate)
        }
        this.approvalRequests = res
      } else {
        this.noRecordAl = true;
      }
      loading.dismiss()
    })
  }

  async getCEOPendingList(user) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();
    this.generalService.getRequest(this.generalService.API_GET_CEO_APPROVAL_LIST).then((res: any) => {
      console.log(res)
      if (res[0].Message == undefined) {
        this.noRecordAl = false;

        for (let i = 0; i < res.length; i++) {
          res[i].PreferDateFrom = this.dateFormat(res[i].PreferDateFrom)
          res[i].PreferDateTo2 = this.dateFormat(res[i].PreferDateTo2)
          res[i].RequestedDate = this.dateFormatNoPlus(res[i].RequestedDate)
          res[i].selected = false
        }
        this.approvalRequests = res
      } else {
        this.noRecordAl = true;

      }
      loading.dismiss()
    })
  }

  async getHeadApproveList(user) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();
    this.generalService.getRequest(this.generalService.API_GET_HEAD_REJECT_LIST + user).then((res: any) => {
      console.log(res)
      if (res[0].Message == undefined) {
        this.noRecordEd = false;

        for (let i = 0; i < res.length; i++) {
          res[i].PreferDateFrom = this.dateFormat(res[i].PreferDateFrom)
          res[i].PreferDateTo2 = this.dateFormat(res[i].PreferDateTo2)
          res[i].RequestedDate = this.dateFormatNoPlus(res[i].RequestedDate)
          res[i].selected = false
        }
        this.approvedRequests = res
      } else {
        this.noRecordEd = true;
      }
      loading.dismiss();
    })
  }

  // API_GET_HEAD_REJECT_LIST
  // API_GET_CFO_REJECT_LIST

  async getCfoApproveList(user) {

    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();

    this.generalService.getRequest(this.generalService.API_GET_CFO_REJECT_LIST).then((res: any) => {
      console.log(res)
      if (res[0].Message == undefined) {
        this.noRecordEd = false;

        for (let i = 0; i < res.length; i++) {
          res[i].PreferDateFrom = this.dateFormat(res[i].PreferDateFrom)
          res[i].PreferDateTo2 = this.dateFormat(res[i].PreferDateTo2)
          res[i].RequestedDate = this.dateFormatNoPlus(res[i].RequestedDate)
          res[i].selected = false
        }
        this.approvedRequests = res
      } else {
        this.noRecordEd = true;
      }
      loading.dismiss();
    })
  }

  // getCEOApproveList
  // getHeadApproveList


  dateFormat(date) {
    var newDate = new Date(date)
    var year = newDate.getFullYear()
    var month = newDate.getMonth() + 1
    var day = newDate.getDate()
    return year + "-" + month + "-" + day
  }

  dateFormatNoPlus(date) {
    var newDate = new Date(date)
    var year = newDate.getFullYear()
    var month = newDate.getMonth()
    var day = newDate.getDate()
    return year + "-" + month + "-" + day
  }


  approveByCeo(isApprove) {
    // this.approvalRequests[i].selected
    // http://mytravelrequest.com/Home/PostCEOApproval?UnBlockBy=hammad.hammad&PKID=1
    for (let i = 0; i < this.approvalRequests.length; i++) {
      if (this.approvalRequests[i].selected == true) {
        this.generalService.postRequestUrl(this.generalService.API_APPROVE_BY_CEO + "UnBlockBy=" + this.userName + "&PKID=" + this.approvalRequests[i].PKID).then((res) => {
          console.log(res)
        })
      }
    }

    this.initFunction();

  }



  approveByCfo(isApprove) {
    for (let i = 0; i < this.approvalRequests.length; i++) {
      if (this.approvalRequests[i].selected == true) {
        this.generalService.postRequestUrl(this.generalService.API_APPROVE_BY_CFO_NEW + "UnBlockBy=" + this.userName + "&PKID=" + this.approvalRequests[i].PKID).then((res) => {
          console.log(res)
        })
      }
    }

    this.initFunction();

  }

  goBackPage() {
    this.location.back();
  }

}
