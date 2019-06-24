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
  airlineInfo: any = {
    preferableFlight: "",
    durationOfVisit: "",
    expectedDateOfReturn: ""
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



  userNameGlobe: any;
  constructor(private activatedRoute: ActivatedRoute, public generalService: GeneralService,
    public localStorrage: Storage, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.isReadOnly = this.activatedRoute.snapshot.paramMap.get('isReadOnly') == "true" ? true : false
    console.log(this.isReadOnly)
    this.pageTitle = this.isReadOnly ? "Travel Request Detail" : "Add Travel Request"



    if (this.isReadOnly) {

      this.basicInfo = {
        natureOfTravel: "domestic",
        purposeOfTravel: "asdf",
        reason: "2",
        chargableToClients: "yes",
        nameOfClients: "Yasir Khan",
        pe: "1",
      }

      this.travelingAdvance = {
        advanceRequired: "yes",
        advanceAmount: "1000"
      }
      this.otherInfo = {
        modeOfTravel: "1",
        hotelBookingRequired: "yes",
        viseRequired: "yes",
        rentACarRequired: "yes",
        otherArrangements: "something"
      }
      this.airlineInfo = {
        preferableFlight: "2",
        durationOfVisit: "5",
        expectedDateOfReturn: "11/11/2019"
      }
      this.travelInfo = {
        departureFrom: "khi",
        departureToOne: "khi",
        departureToTwo: "lhr",
        departureToThree: "lhr",
        preferableDateFrom: "02/04/2019",
        preferableDateToOne: "02/04/2019",
        preferableDateToTwo: "08/04/2019",
        preferableDateToThree: "08/04/2019",
        preferableTimeFrom: "09:10",
        preferableTimeToOne: "09:10",
        preferableTimeToTwo: "12:10",
        preferableTimeToThree: "12:10",
      }

    }


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

    var obj = {
      TRFNum: "TR-5",
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

}


// Group_Name: "admin"
// Group_Name1: "admin"
// PKID: 1
// PKID1: 1
// Status: true
// Status1: true
// Updated_by1: "hammad"
// Updated_on1: "2018-01-30T23:57:00"
// Usr_Name: "hammad.hammad"
// page_name: "admin_department_travel_form"
// updated_by: "hammad.hammad"
// updated_on: "2018-09-20T22:07:00"
