import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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




  // basicInfo: any = {
  //   natureOfTravel: "domestic",
  //   purposeOfTravel: "Business",
  //   reason: "Travel",
  //   chargableToClients: "yes",
  //   nameOfClients: "Yasir Khan",
  //   pe: "1",
  // }

  // travelingAdvance: any = {
  //   advanceRequired: "yes",
  //   advanceAmount: "1000"
  // }
  // otherInfo: any = {
  //   modeOfTravel: "1",
  //   hotelBookingRequired: "yes",
  //   viseRequired: "yes",
  //   rentACarRequired: "yes",
  //   otherArrangements: "something"
  // }
  // airlineInfo: any = {
  //   preferableFlight: "2",
  //   durationOfVisit: "5",
  //   expectedDateOfReturn: "11/11/2019"
  // }
  // travelInfo: any = {
  //   departureFrom: "khi",
  //   departureToOne: "khi",
  //   departureToTwo: "lhr",
  //   departureToThree: "lhr",
  //   preferableDateFrom: "02/04/2019",
  //   preferableDateToOne: "02/04/2019",
  //   preferableDateToTwo: "08/04/2019",
  //   preferableDateToThree: "08/04/2019",
  //   preferableTimeFrom: "09:10",
  //   preferableTimeToOne: "09:10",
  //   preferableTimeToTwo: "12:10",
  //   preferableTimeToThree: "12:10",
  // }


  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isReadOnly = this.activatedRoute.snapshot.paramMap.get('isReadOnly') == "true" ? true : false
    console.log(this.isReadOnly)
    this.pageTitle = this.isReadOnly ? "Travel Request Detail" : "Add Travel Request"



    if (this.isReadOnly) {

      this.basicInfo = {
        natureOfTravel: "domestic",
        purposeOfTravel: "Business",
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

}
