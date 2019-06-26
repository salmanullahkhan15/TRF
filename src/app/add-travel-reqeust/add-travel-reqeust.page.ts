import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../general.service';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-add-travel-reqeust',
  templateUrl: './add-travel-reqeust.page.html',
  styleUrls: ['./add-travel-reqeust.page.scss'],
})
export class AddTravelReqeustPage implements OnInit {

  userNameGlobe: any;
  trfNum: any = 0
  readTRFNum: any = 0
  staffCode: string;
  pageTitle: string;
  chargableToClients: string;
  isReadOnly: boolean = false;
  designations: any = []
  flights: any = []
  clients: any = []
  reasonPurpose: any = []
  peList: any = []
  userInfo: any = {
    staffCode: "0001",
    designation: "employee",
    department: "accounts",
    agency: "abc agency",
    location: "karachi"
  }
  basicInfo: any = {
    natureOfTravel: "",
    purposeOfTravel: "",
    reason: "",
    chargableToClients: "",
    nameOfClients: "",
    pe: "",
  }

  travelingAdvance: any = {
    advanceRequired: "",
    advanceAmount: ""
  }
  otherInfo: any = {
    modeOfTravel: "",
    hotelBookingRequired: "",
    viseRequired: "",
    rentACarRequired: "",
    otherArrangements: ""
  }
  travelInfo: any = {
    departureFrom: "",
    departureToOne: "",
    departureToTwo: "",
    departureToThree: "",
    preferableDateFrom: "",
    preferableDateToOne: "",
    preferableDateToTwo: "",
    preferableDateToThree: "",
    preferableTimeFrom: "",
    preferableTimeToOne: "",
    preferableTimeToTwo: "",
    preferableTimeToThree: "",
  }

  airlineInfo: any = {
    preferableFlight: "",
    durationOfVisit: "",
    expectedDateOfReturn: ""
  }

  budget: any = {
    budget: "",
    used: "",
    selected: "",
    balance: "",

  }
  isApproveBtn: boolean;

  constructor(private activatedRoute: ActivatedRoute, public generalService: GeneralService,
    public localStorrage: Storage, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    var readData = this.activatedRoute.snapshot.paramMap.get('readData')
    this.isApproveBtn = this.activatedRoute.snapshot.paramMap.get('isApproveBtn') == "true" ? true : false
    this.isReadOnly = this.activatedRoute.snapshot.paramMap.get('isReadOnly') == "true" ? true : false
    console.log(readData)
    console.log(this.isReadOnly)
    this.pageTitle = this.isReadOnly ? "Travel Request Detail" : "Add Travel Request"
    // this.getReadOnlyData(readData)
    if (this.isReadOnly == true && readData != null) {
      this.getReadOnlyData(readData)
      this.getBudget()
    }

    // if (this.isReadOnly) {

    //   this.basicInfo = {
    //     natureOfTravel: "domestic",
    //     purposeOfTravel: "asdf",
    //     reason: "2",
    //     chargableToClients: "yes",
    //     nameOfClients: "Yasir Khan",
    //     pe: "1",
    //   }

    //   this.travelingAdvance = {
    //     advanceRequired: "yes",
    //     advanceAmount: "1000"
    //   }
    //   this.otherInfo = {
    //     modeOfTravel: "1",
    //     hotelBookingRequired: "yes",
    //     viseRequired: "yes",
    //     rentACarRequired: "yes",
    //     otherArrangements: "something"
    //   }
    //   this.airlineInfo = {
    //     preferableFlight: "2",
    //     durationOfVisit: "5",
    //     expectedDateOfReturn: "11/11/2019"
    //   }
    //   this.travelInfo = {
    //     departureFrom: "khi",
    //     departureToOne: "khi",
    //     departureToTwo: "lhr",
    //     departureToThree: "lhr",
    //     preferableDateFrom: "02/04/2019",
    //     preferableDateToOne: "02/04/2019",
    //     preferableDateToTwo: "08/04/2019",
    //     preferableDateToThree: "08/04/2019",
    //     preferableTimeFrom: "09:10",
    //     preferableTimeToOne: "09:10",
    //     preferableTimeToTwo: "12:10",
    //     preferableTimeToThree: "12:10",
    //   }

    // }


    this.getUserData()
  }

  chargableToClientsChange(val) {
    console.log(val)
  }

  preferableDateFromChange() {
    // console.log(val)
    if (this.travelInfo.preferableDateFrom != "" && this.travelInfo.preferableDateToTwo != "") {

      const date1 = new Date(this.travelInfo.preferableDateFrom);
      const date2 = new Date(this.travelInfo.preferableDateToTwo);

      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      this.airlineInfo.durationOfVisit = diffDays
      console.log(diffDays);
    }

  }

  preferableDateToTwoChange() {
    if (this.travelInfo.preferableDateFrom != "" && this.travelInfo.preferableDateToTwo != "") {

      const date1 = new Date(this.travelInfo.preferableDateFrom);
      const date2 = new Date(this.travelInfo.preferableDateToTwo);

      const diffTime = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      console.log(diffDays);
      this.airlineInfo.durationOfVisit = diffDays

    }
  }

  async getUserData() {

    this.localStorrage.get("user_detail").then(async (res) => {
      console.log(res[0])
      if (res[0] != null) {
        var userName = res[0].Usr_Name
        this.userNameGlobe = res[0].Usr_Name
        const loading = await this.loadingCtrl.create({
          message: 'Loading'
        });
        await loading.present();
        this.generalService.getData(userName)
          .subscribe(res => {
            console.log(res);
            var user = res[0][0]
            this.designations = res[1]
            this.flights = res[2]
            this.clients = res[3]
            this.reasonPurpose = res[4]
            this.trfNum = res[5]
            this.userInfo = {
              staffCode: user.StaffCode,
              designation: user.Designation,
              department: user.Department,
              agency: user.AgencyName,
              location: user.Location
            }
            loading.dismiss();
          }, err => {
            console.log(err);
            loading.dismiss();
          });
      }
    })

  }

  clientSelect(clientName) {
    console.log(clientName)
    this.generalService.getRequest(this.generalService.API_GET_PE_LIST + clientName).then((res) => {
      console.log(res)
      this.peList = res
    })

  }



  submitInsertForm() {
    console.log(this.trfNum)
    var obj = {
      TRFNum: "TR-" + (parseInt(this.trfNum[0].TRFNum) + 1),
      EmployeeID: this.userNameGlobe,
      IsChargeToClient: this.basicInfo.chargableToClients,
      Client_Region: this.basicInfo.nameOfClients,
      PE: this.basicInfo.pe,
      Nature: this.basicInfo.natureOfTravel,
      Purpose: this.basicInfo.purposeOfTravel,
      Purpose_reason: this.basicInfo.purposeOfTravel,
      DestinationIDFrom: this.travelInfo.departureFrom,
      DestinationIDTo1: this.travelInfo.departureFrom,
      DestinationIDTo2: this.travelInfo.departureToTwo,
      DestinationIDTo3: this.travelInfo.departureToTwo,
      PreferDateFrom: this.dateFormat(this.travelInfo.preferableDateFrom),
      PreferDateTo1: this.dateFormat(this.travelInfo.preferableDateFrom),
      PreferDateTo2: this.dateFormat(this.travelInfo.preferableDateToTwo),
      PreferDateTo3: this.dateFormat(this.travelInfo.preferableDateToTwo),
      PreferTimeFrom: this.timeFormat(this.travelInfo.preferableTimeFrom),
      PreferTimeTo1: this.timeFormat(this.travelInfo.preferableTimeFrom),
      PreferTimeTo2: this.timeFormat(this.travelInfo.preferableTimeToTwo),
      PreferTimeTo3: this.timeFormat(this.travelInfo.preferableTimeToTwo),
      PreferFlight: this.airlineInfo.preferableFlight,
      Duration: this.airlineInfo.durationOfVisit,
      ReturnDate: this.dateFormat(this.travelInfo.preferableDateToTwo),
      Mode: this.otherInfo.modeOfTravel,
      IsHotel: this.otherInfo.hotelBookingRequired,
      IsVisa: this.otherInfo.viseRequired,
      Isrentacar: this.otherInfo.rentACarRequired,
      Others: this.otherInfo.otherArrangements,
      IsAdvance: this.travelingAdvance.advanceRequired,
      AdvAmount: this.travelingAdvance.advanceAmount,
      RequestedBy: this.userNameGlobe
    }

    console.log(obj)
    console.log(JSON.stringify(obj))

    this.generalService.postRequest(this.generalService.API_POST_USER_FORM, obj).then((res) => {
      console.log(res)
    })
  }


  dateFormat(date) {
    var newDate = new Date(date)

    var year = newDate.getFullYear()
    var month = newDate.getMonth()
    var day = newDate.getDate()

    return year + "-" + month + "-" + day

  }

  timeFormat(date) {
    var newDate = new Date(date)
    var hour = newDate.getHours()
    var min = newDate.getMinutes()

    return hour + ":" + min
  }


  getReadOnlyData(trfNum) {
    // API_GET_APPLICATION_BY_TRFNUM
    this.generalService.getRequest(this.generalService.API_GET_APPLICATION_BY_TRFNUM + trfNum).then((res) => {
      console.log(res)
      var formData = res[0]
      if (this.isReadOnly) {
        this.readTRFNum = formData.TRFNum

        this.userInfo = {
          staffCode: formData.StaffCode,
          designation: formData.Designation,
          department: formData.Department,
          agency: formData.AgencyName,
          location: formData.Location
        }

        this.basicInfo = {
          natureOfTravel: formData.Nature,
          purposeOfTravel: formData.Purpose,
          reason: formData.Purpose_reason,
          chargableToClients: formData.IsChargeToClient,
          nameOfClients: formData.Client_Region,
          pe: formData.PE,
        }

        this.travelingAdvance = {
          advanceRequired: formData.IsAdvance,
          advanceAmount: formData.AdvAmount
        }
        this.otherInfo = {
          modeOfTravel: formData.Mode,
          hotelBookingRequired: formData.IsHotel,
          viseRequired: formData.IsVisa,
          rentACarRequired: formData.Isrentacar,
          otherArrangements: formData.Others
        }
        this.airlineInfo = {
          preferableFlight: formData.PreferFlight,
          durationOfVisit: formData.Duration,
          expectedDateOfReturn: formData.ReturnDate
        }
        this.travelInfo = {
          departureFrom: formData.DestinationIDFrom,
          departureToOne: formData.DestinationIDTo1,
          departureToTwo: formData.DestinationIDTo2,
          departureToThree: formData.DestinationIDTo3,
          preferableDateFrom: formData.PreferDateFrom,
          preferableDateToOne: formData.PreferDateTo1,
          preferableDateToTwo: formData.PreferDateTo2,
          preferableDateToThree: formData.PreferDateTo3,
          preferableTimeFrom: formData.PreferTimeFrom,
          preferableTimeToOne: formData.PreferTimeTo1,
          preferableTimeToTwo: formData.PreferTimeTo2,
          preferableTimeToThree: formData.PreferTimeTo3,
        }
      }
    })
  }
  // CFO = 2
  // CEO = 3
  // HEAD = 4

  approveRejectCfoHead(isApprove) {
    // this.generalService.userRole

    // userNameGlobe
    // readTRFNum

    // HEAD = 4

    var status = isApprove == 1 ? "Approved" : "Reject"

    if (this.generalService.userRole == 4) {

      // UnBlockBy = hammad.hammad & Status=Reject & Reason=test & TRFNum=TR - 1

      this.generalService.postRequestUrl(this.generalService.API_APPROVE_BY_HEAD + "UnBlockBy=" + this.userNameGlobe + "&Status=" + status + "&Reason=test" + "&TRFNum=" + this.readTRFNum).then((res) => {
        console.log(res)
      })
    }

    // CFO = 2
    if (this.generalService.userRole == 2) {
      this.generalService.postRequestUrl(this.generalService.API_APPROVE_BY_CFO + "UnBlockBy=" + this.userNameGlobe + "&Status=" + status + "&Reason=test" + "&TRFNum=" + this.readTRFNum).then((res) => {
        console.log(res)
      })
    }

  }


  getBudget() {
    // API_GET_BUDGET + this.readTRFNum
    this.generalService.getRequest(this.generalService.API_GET_BUDGET + this.readTRFNum).then((res) => {
      this.budget = {
        budget: res[0].Total_Budget,
        used: res[0].Total_Budget_Used,
        selected: res[0].This_TRF,
        balance: res[0].Balance,
      }

    })
  }



}

// cfo
// http://mytravelrequest.com/Home/GetBudgetBalance?TRFNum=TR-1
// head
// http://mytravelrequest.com/Home/GetBudgetBalance?TRFNum=TR-1


// "Total_Budget": 40000,
// "This_TRF": 2504,
// "Actual_cost": 0,
// "Total_Budget_Used": 3505,
// "Balance": 33991