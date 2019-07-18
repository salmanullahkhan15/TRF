import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../general.service';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController } from '@ionic/angular';
import { Location } from "@angular/common";
import { DatePicker } from '@ionic-native/date-picker/ngx';
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
    departureToFour: "",
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


  trfNumNew: any;
  actionReason: any = ""
  toggleItem: number = 0
  constructor(private activatedRoute: ActivatedRoute, public generalService: GeneralService,
    public localStorrage: Storage, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private location: Location,
    private datePicker: DatePicker,
  ) { }

  ngOnInit() {


    // console.log(this.generalService.userRole)
    // console.log(this.generalService.userRole)
    // console.log(this.generalService.userRole)
    // console.log(this.generalService.userRole)
    // console.log(this.generalService.userRole)



    var readData = this.activatedRoute.snapshot.paramMap.get('readData')
    this.isApproveBtn = this.activatedRoute.snapshot.paramMap.get('isApproveBtn') == "true" ? true : false
    this.isReadOnly = this.activatedRoute.snapshot.paramMap.get('isReadOnly') == "true" ? true : false
    console.log(readData)
    console.log(this.isReadOnly)

    var titl = this.isApproveBtn ? "TRF Detail For Head" : "TRF Detail"

    this.pageTitle = this.isReadOnly ? titl : "Add Travel Request"
    // this.getReadOnlyData(readData)
    if (this.isReadOnly == true && readData != null) {
      console.log("asdfasdfasdf")
      this.getReadOnlyData(readData)
    }
    this.getUserData()
  }

  chargableToClientsChange(val) {
    console.log(val)
  }

  clearForm() {
    this.basicInfo = {
      natureOfTravel: "",
      purposeOfTravel: "",
      reason: "",
      chargableToClients: "",
      nameOfClients: "",
      pe: "",
    }

    this.travelingAdvance = {
      advanceRequired: "",
      advanceAmount: ""
    }
    this.otherInfo = {
      modeOfTravel: "",
      hotelBookingRequired: "",
      viseRequired: "",
      rentACarRequired: "",
      otherArrangements: ""
    }
    this.travelInfo = {
      departureFrom: "",
      departureToOne: "",
      departureToTwo: "",
      departureToThree: "",
      departureToFour: "",
      preferableDateFrom: "",
      preferableDateToOne: "",
      preferableDateToTwo: "",
      preferableDateToThree: "",
      preferableTimeFrom: "",
      preferableTimeToOne: "",
      preferableTimeToTwo: "",
      preferableTimeToThree: "",
    }

    this.airlineInfo = {
      preferableFlight: "",
      durationOfVisit: "",
      expectedDateOfReturn: ""
    }

    this.budget = {
      budget: "",
      used: "",
      selected: "",
      balance: "",
    }

    this.otherInfo.hotelBookingRequired = ""
    this.basicInfo.totalHotelPrice = ""
    this.basicInfo.tpamount = ""
    this.travelInfo.airlinePrice = ""

    this.toggleItem = 0

    // var hotelPrice = this.otherInfo.hotelBookingRequired == "yes" ? this.basicInfo.totalHotelPrice : 0

    // var visaPrice = this.otherInfo.viseRequired == "yes" ? this.otherInfo.visaPrice : 0

    // var transportPrice = this.basicInfo.tpamount == "yes" ? this.basicInfo.tpamount : 0

    // var airlinePrice = this.travelInfo.airlinePrice

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
      this.calcTotalHotelPrice()
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
      this.calcTotalHotelPrice()
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


    // basicInfo.natureOfTravel
    // basicInfo.chargableToClients
    // basicInfo.purposeOfTravel
    // basicInfo.reason
    // travelInfo.departureFrom
    // travelInfo.departureToTwo
    // travelInfo.preferableDateFrom
    // travelInfo.preferableDateToTwo
    // otherInfo.hotelBookingRequired
    // otherInfo.rentACarRequired

    // console.log(this.basicInfo.natureOfTravel != "" && this.basicInfo.natureOfTravel != null && this.basicInfo.natureOfTravel != undefined)
    // console.log(this.basicInfo.chargableToClients != "" && this.basicInfo.chargableToClients != null && this.basicInfo.chargableToClients != undefined)
    // console.log(this.basicInfo.purposeOfTravel != "" && this.basicInfo.purposeOfTravel != null && this.basicInfo.purposeOfTravel != undefined)
    // console.log(this.basicInfo.reason != "" && this.basicInfo.reason != null && this.basicInfo.reason != undefined)
    // console.log(this.travelInfo.departureFrom != "" && this.travelInfo.departureFrom != null && this.travelInfo.departureFrom != undefined)
    // console.log(this.travelInfo.departureToTwo != "" && this.travelInfo.departureToTwo != null && this.travelInfo.departureToTwo != undefined)
    // console.log(this.travelInfo.preferableDateToTwo != "" && this.travelInfo.preferableDateToTwo != null && this.travelInfo.preferableDateToTwo != undefined)
    // console.log(this.travelInfo.natureOfTravel != "" && this.travelInfo.natureOfTravel != null && this.travelInfo.natureOfTravel != undefined)
    // console.log(this.otherInfo.hotelBookingRequired != "" && this.otherInfo.hotelBookingRequired != null && this.otherInfo.hotelBookingRequired != undefined)
    // console.log(this.otherInfo.rentACarRequired != "" && this.otherInfo.rentACarRequired != null && this.otherInfo.rentACarRequired != undefined)

    if (
      this.basicInfo.natureOfTravel != "" && this.basicInfo.natureOfTravel != null && this.basicInfo.natureOfTravel != undefined &&
      this.basicInfo.chargableToClients != "" && this.basicInfo.chargableToClients != null && this.basicInfo.chargableToClients != undefined &&
      this.basicInfo.purposeOfTravel != "" && this.basicInfo.purposeOfTravel != null && this.basicInfo.purposeOfTravel != undefined &&
      this.basicInfo.reason != "" && this.basicInfo.reason != null && this.basicInfo.reason != undefined &&
      this.travelInfo.departureFrom != "" && this.travelInfo.departureFrom != null && this.travelInfo.departureFrom != undefined &&
      this.travelInfo.departureToTwo != "" && this.travelInfo.departureToTwo != null && this.travelInfo.departureToTwo != undefined &&
      this.travelInfo.preferableDateToTwo != "" && this.travelInfo.preferableDateToTwo != null && this.travelInfo.preferableDateToTwo != undefined &&
      this.travelInfo.preferableDateFrom != "" && this.travelInfo.preferableDateFrom != null && this.travelInfo.preferableDateFrom != undefined &&
      // this.travelInfo.natureOfTravel != "" && this.travelInfo.natureOfTravel != null && this.travelInfo.natureOfTravel != undefined &&
      this.otherInfo.hotelBookingRequired != "" && this.otherInfo.hotelBookingRequired != null && this.otherInfo.hotelBookingRequired != undefined &&
      this.otherInfo.rentACarRequired != "" && this.otherInfo.rentACarRequired != null && this.otherInfo.rentACarRequired != undefined
    ) {
      if (this.basicInfo.chargableToClients == 'yes') {
        if (this.basicInfo.pe != "" && this.basicInfo.pe != null && this.basicInfo.pe != undefined &&
          this.basicInfo.nameOfClients != "" && this.basicInfo.nameOfClients != null && this.basicInfo.nameOfClients != undefined
        ) {
          if (this.basicInfo.natureOfTravel == "international") {
            if (this.otherInfo.viseRequired != "" && this.otherInfo.viseRequired != null && this.otherInfo.viseRequired != undefined) {
              this.postRequestSubmit()
            } else {
              this.generalService.presentToast("Please fill all required fields")
              return false;
            }
          } else {
            this.postRequestSubmit()
          }
        } else {
          this.generalService.presentToast("Please fill all required fields")
          return false;
        }
      } else {
        this.postRequestSubmit()
      }
    } else {
      this.generalService.presentToast("Please fill all required fields")
      return false;
    }


  }


  async postRequestSubmit() {

    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();

    this.generalService.getRequest(this.generalService.API_GET_LAST_TRF_ID).then((trfRes) => {
      console.log(trfRes)


      this.trfNumNew = trfRes

      console.log(Number.isNaN(parseInt(this.trfNumNew[0].TRFNum)))

      var trfCheck = (Number.isNaN(parseInt(this.trfNumNew[0].TRFNum)) ? 0 : parseInt(this.trfNumNew[0].TRFNum)) + 1

      console.log(trfCheck)

      var obj = {
        TRFNum: "TR-" + trfCheck,
        EmployeeID: this.userNameGlobe,
        IsChargeToClient: this.basicInfo.chargableToClients,
        Client_Region: this.basicInfo.nameOfClients,
        PE: this.basicInfo.pe,
        Nature: this.basicInfo.natureOfTravel,
        Purpose: this.basicInfo.purposeOfTravel,
        Purpose_reason: this.basicInfo.reason,
        DestinationIDFrom: this.travelInfo.departureFrom,
        DestinationIDTo1: this.travelInfo.departureToTwo,
        DestinationIDTo2: this.travelInfo.departureToThree,
        DestinationIDTo3: this.travelInfo.departureToFour,
        PreferDateFrom: this.dateFormat(this.travelInfo.preferableDateFrom),
        PreferDateTo1: this.dateFormat(this.travelInfo.preferableDateFrom),
        PreferDateTo2: this.dateFormat(this.travelInfo.preferableDateToTwo),
        PreferDateTo3: this.dateFormat(this.travelInfo.preferableDateToTwo),
        PreferTimeFrom: this.travelInfo.preferableTimeFrom,
        PreferTimeTo1: this.travelInfo.preferableTimeFrom,
        PreferTimeTo2: this.travelInfo.preferableTimeToTwo,
        PreferTimeTo3: this.travelInfo.preferableTimeToTwo,
        PreferFlight: this.airlineInfo.preferableFlight,
        Duration: this.airlineInfo.durationOfVisit,
        ReturnDate: this.dateFormat(this.travelInfo.preferableDateToTwo),
        Mode: this.otherInfo.modeOfTravel,
        IsHotel: this.otherInfo.hotelBookingRequired,
        IsVisa: this.otherInfo.viseRequired,
        Isrentacar: this.otherInfo.rentACarRequired,
        Others: this.otherInfo.otherArrangements,
        IsAdvance: this.travelingAdvance.advanceRequired,
        AdvAmount: this.travelingAdvance.advanceAmount == "" ? 0 : this.travelingAdvance.advanceAmount,
        RequestedBy: this.userNameGlobe
      }

      console.log(JSON.stringify(obj))

      this.generalService.postRequest(this.generalService.API_POST_USER_FORM, obj).then((res) => {
        console.log(res)
        loading.dismiss()

        if (res[0] != undefined) {

          if (res[0].Message == "Inserted Successfully!") {
            this.postExtraData()
            this.generalService.presentToast("Form Inserted Successfully")

          } else {
            this.generalService.presentToast("Something went wrong!")
          }
        } else {
          this.generalService.presentToast("Something went wrong!")
        }

      })
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
    console.log()
    this.generalService.getRequest(this.generalService.API_GET_APPLICATION_BY_TRFNUM + trfNum).then((res) => {
      console.log(res)
      var formData = res[0]
      if (this.isReadOnly) {
        this.readTRFNum = formData.TRFNum
        console.log(this.readTRFNum)

        this.getBudget()


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
          pe: formData.PKID,
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
          departureToTwo: formData.DestinationIDTo1,
          departureToThree: formData.DestinationIDTo2,
          departureToFour: formData.DestinationIDTo3,
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

    // this.presentAlertPrompt()

    var status = isApprove == 1 ? "Approved" : "Reject"




    if (this.generalService.userRole == 3) {
      var isBudgetNegative = (this.budget.budget - this.budget.used) - (this.budget.selected + this.budget.balance) < 0 ? true : false
    } else {
      var isBudgetNegative = (this.budget.budget - this.budget.used) - this.budget.selected < 0 ? true : false
    }

    if (isBudgetNegative && isApprove == 1) {
      this.generalService.presentToast("Insufficient balance for selected TRF. Please check budget.")
    } else {

      if (this.generalService.userRole == 4) {

        this.generalService.postRequestUrl(this.generalService.API_APPROVE_BY_HEAD + "UnBlockBy=" + this.userNameGlobe + "&Status=" + status + "&Reason=" + this.actionReason + "&TRFNum=" + this.readTRFNum).then((res) => {
          console.log(res)
          this.generalService.presentToast("Updated successfully")
          this.goBack()
        })
      }

      // CFO = 2
      if (this.generalService.userRole == 2) {
        this.generalService.postRequestUrl(this.generalService.API_APPROVE_BY_CFO + "UnBlockBy=" + this.userNameGlobe + "&Status=" + status + "&Reason=" + this.actionReason + "&TRFNum=" + this.readTRFNum).then((res) => {
          console.log(res)
          this.generalService.presentToast("Updated successfully")
          this.goBack()
        })
      }
    }


  }


  getBudget() {
    // API_GET_BUDGET + this.readTRFNum

    console.log(this.generalService.API_GET_BUDGET + this.readTRFNum)

    this.generalService.getRequest(this.generalService.API_GET_BUDGET + this.readTRFNum).then((res) => {
      console.log(res)





      this.budget = {
        budget: res[0].Total_Budget,
        used: res[0].Total_Budget_Used,
        selected: res[0].This_TRF,
        balance: this.generalService.userRole == 3 ? (res[0].This_TRF + res[0].Balance) : res[0].Balance,
      }

    })
  }


  // NEW WORK---------------\\

  natureOfTravelSelect() {
    // natureOfTravelSelect
    console.log(this.basicInfo.natureOfTravel)

    var param = this.basicInfo.natureOfTravel == "domestic" ? "Domestic" : "International"
    this.generalService.getRequest(this.generalService.API_GET_TRANSPORT_HOTEL_PRICE + param).then((res) => {
      this.basicInfo.hpamount = res[0].hpamount
      this.basicInfo.tpamount = res[0].tpamount

      // console.log(asdfasdf)
      console.log(this.basicInfo.hpamount)
      console.log(this.basicInfo.tpamount)
      this.calcTotalHotelPrice()

    })

  }


  departureToSelect() {
    this.generalService.getRequest(this.generalService.API_GET_AIRLINE_PRICE + this.travelInfo.departureToTwo).then((res) => {
      this.travelInfo.airlinePrice = res[0].Amount
    })

  }


  // Example:http://mytravelrequest.com/Home/GetVisaPrice?Destination=hammad
  visaRequiredSelect() {
    // this.otherInfo.viseRequired

    if (this.otherInfo.viseRequired == "yes") {
      this.generalService.getRequest(this.generalService.API_GET_VISA_PRICE + this.travelInfo.departureToTwo).then((res) => {
        this.otherInfo.visaPrice = res[0].Amount
      })
    }

  }

  calcTotalHotelPrice() {
    // this.airlineInfo.durationOfVisit
    // this.basicInfo.hpamount
    this.basicInfo.totalHotelPrice = this.airlineInfo.durationOfVisit * this.basicInfo.hpamount

    console.log(this.basicInfo.totalHotelPrice)

  }


  // Example:http://mytravelrequest.com/Home/InsertExpenses?TRFNum=TR-5&Hotel_price_bud=0&Visa_price_bud=0&Trans_price_bud=501&Airline_price_bud=1000&Updated_by=hammad.hammad&Updated_on=2019-06-19 00:33:00

  postExtraData() {

    var hotelPrice = this.otherInfo.hotelBookingRequired == "yes" ? this.basicInfo.totalHotelPrice : 0

    var visaPrice = this.otherInfo.viseRequired == "yes" ? this.otherInfo.visaPrice : 0

    var transportPrice = this.otherInfo.rentACarRequired == "yes" ? this.basicInfo.tpamount : 0

    var airlinePrice = this.travelInfo.airlinePrice

    var date = this.dateFormat(new Date()) + " " + this.timeFormat(new Date())

    var trfCheck = (Number.isNaN(parseInt(this.trfNumNew[0].TRFNum)) ? 0 : parseInt(this.trfNumNew[0].TRFNum)) + 1


    console.log(this.generalService.API_POST_EXTRA_FORM_DATA + "TRFNum=" + "TR-" + trfCheck + "&Hotel_price_bud=" + hotelPrice + "&Visa_price_bud=" + visaPrice + "&Trans_price_bud=" + transportPrice + "&Airline_price_bud=" + airlinePrice + "&Updated_by=" + this.userNameGlobe + "&Updated_on=" + date)
    console.log(this.generalService.API_POST_EXTRA_FORM_DATA + "TRFNum=" + "TR-" + trfCheck + "&Hotel_price_bud=" + hotelPrice + "&Visa_price_bud=" + visaPrice + "&Trans_price_bud=" + transportPrice + "&Airline_price_bud=" + airlinePrice + "&Updated_by=" + this.userNameGlobe + "&Updated_on=" + date)

    this.generalService.postRequestUrl(this.generalService.API_POST_EXTRA_FORM_DATA + "TRFNum=" + "TR-" + trfCheck + "&Hotel_price_bud=" + hotelPrice + "&Visa_price_bud=" + visaPrice + "&Trans_price_bud=" + transportPrice + "&Airline_price_bud=" + airlinePrice + "&Updated_by=" + this.userNameGlobe + "&Updated_on=" + date).then((res) => {
      this.clearForm()
      console.log(res)

    })
  }



  async presentAlertPrompt(isApprove) {
    const alert = await this.alertCtrl.create({
      header: 'Reason',
      inputs: [
        {
          name: 'actionReason',
          type: 'text',
          placeholder: 'Enter reason'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data.actionReason);
            if (data.actionReason != "") {
              this.actionReason = data.actionReason
              console.log(data.actionReason);
              this.approveRejectCfoHead(isApprove)
            }

          }
        }
      ]
    });

    await alert.present();
  }


  goBack() {
    this.location.back();
    // this.generalService.presentToast("Please fill all required fields")
  }


  toggleList(num) {
    if (num == this.toggleItem) {
      this.toggleItem = 0

    } else {
      this.toggleItem = num
    }
  }

  goBackPage() {
    this.location.back();
  }

  openCalender() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      (date) => {
        // console.log('Got date: ', date)
        console.log(this.dateFormat(date))
        // console.log(this.timeFormat(date))
        // this.dateFormat(date)
        // this.timeFormat(date)
        this.travelInfo.preferableDateFrom = this.dateFormat(date)
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  openCalenderPrefDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      (date) => {
        // console.log('Got date: ', date)
        console.log(this.dateFormat(date))
        // console.log(this.timeFormat(date))
        // this.dateFormat(date)
        // this.timeFormat(date)
        this.travelInfo.preferableDateFrom = this.dateFormat(date)
        this.preferableDateFromChange();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  openCalenderPrefTo() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      (date) => {
        // console.log('Got date: ', date)
        console.log(this.dateFormat(date))
        // console.log(this.timeFormat(date))
        // this.dateFormat(date)
        // this.timeFormat(date)
        this.travelInfo.preferableDateToTwo = this.dateFormat(date)
        this.preferableDateToTwoChange();
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  openCalenderPrefTime() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      (date) => {
        // console.log('Got date: ', date)
        // console.log(this.dateFormat(date))
        // console.log(this.timeFormat(date))
        // this.dateFormat(date)
        // this.timeFormat(date)
        this.travelInfo.preferableTimeFrom = this.tConvert(this.timeFormat(date))
        alert(this.travelInfo.preferableTimeFrom)
        alert(this.travelInfo.preferableTimeFrom)
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  openCalenderPrefTimeTo() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      (date) => {
        // console.log('Got date: ', date)
        // console.log(this.timeFormat(date))
        // this.dateFormat(date)
        // this.timeFormat(date)
        this.travelInfo.preferableTimeToTwo = this.tConvert(this.timeFormat(date))
        alert(this.travelInfo.preferableTimeToTwo)
        alert(this.travelInfo.preferableTimeToTwo)

      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  // openCalenderPrefTo
  // this.travelInfo.preferableDateToTwo = this.dateFormat(date)

  // openCalenderPrefTime
  // this.travelInfo.preferableTimeFrom

  // openCalenderPrefTimeTo
  // this.travelInfo.preferableTimeToTwo



}