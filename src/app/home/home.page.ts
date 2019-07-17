import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userType: any;
  appPages: any = []
  userName: any;
  userDesignation: any;
  constructor(private activatedRoute: ActivatedRoute,
    private datePicker: DatePicker,
    public generalService: GeneralService,
    public events: Events,
    private router: Router,
    public localStorrage: Storage) {


  }

  ngOnInit() {
    // this.userType = this.activatedRoute.snapshot.paramMap.get('userType');
    // console.log(this.userType)
    // console.log(this.userType)
    // console.log(this.userType)
    // console.log(this.userType)
    // console.log(this.userType)
    // this.localStorrage.get("user_detail").then((res) => {
    //   // this.events.publish('sidemenuEvent', res);
    //   console.log(res)
    //   this.manageSideMenu(res)

    // })

    this.appPages = [
      "Add Travel Request",
      "My Travel Request",
      "Approve/Reject Ceo",
      "Approve/Reject Cfo",
      "Approve/Reject Head"
    ]

  }

  ionViewWillEnter() {
    this.localStorrage.get("user_detail").then((res) => {
      // this.events.publish('sidemenuEvent', res);
      console.log(res)
      // this.manageSideMenu(res)

    })
  }



  openCalendar() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      (date) => {
        console.log('Got date: ', date)
        console.log(this.dateFormat(date))
        console.log(this.timeFormat(date))
        // this.dateFormat(date)
        // this.timeFormat(date)
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  gotoTravelRequestForm() {
    this.generalService.userRole = 0
    this.router.navigateByUrl("/add-travel-reqeust" + "/" + null + "/" + false + "/" + false);
  }


  gotoMyTravelRequests() {
    this.router.navigateByUrl("/my-travel-request");
  }

  gotoHeadPending() {
    this.router.navigateByUrl("/approve-reject/4/pending");
  }

  gotoHeadApprove() {
    this.router.navigateByUrl("/approve-reject/4/approved");
  }


  gotoCfoPending() {
    this.router.navigateByUrl("/approve-reject/2/pending");
  }

  gotoCfoApprove() {
    this.router.navigateByUrl("/approve-reject/2/approved");
  }

  gotoCeoPending() {
    this.router.navigateByUrl("/approve-reject/3/pending");
  }




  manageSideMenu(data) {

    this.userName = data[0].Usr_Name
    this.userDesignation = data[0].Group_Name



    this.appPages = []


    // var oneMenu = {
    //   title: 'Home',
    //   url: '/home',
    //   icon: 'home'
    // }
    // this.appPages.push(oneMenu)

    // var twoMenu = {
    // var item = 'Add Travel Request'
    // url: '/add-travel-reqeust',
    // icon: 'home'

    // var threeMenu = {
    //   title: 'My Travel Request',
    //   // url: '/my-travel-request',
    //   // icon: 'home'
    // }
    // var item = 'My Travel Request'
    // }
    this.appPages.push("Add Travel Request")

    this.appPages.push("My Travel Request")

    for (let i = 0; i < data.length; i++) {

      if (data[i].page_name == "travel_request_form_approved_head") {
        // var fourMenu = {
        //   title: 'Approve/Reject Head',
        //   // url: '/approve-reject/4',
        //   // icon: 'home'
        // }
        // this.appPages.push(fourMenu)

        // var item = 'Approve/Reject Head'

        this.appPages.push("Approve/Reject Head")

      }

      if (data[i].page_name == "travel_request_form_approved_cfo") {
        // var fourMenu = {
        //   title: 'Approve/Reject Cfo',
        //   // url: '/approve-reject/2',
        //   // icon: 'home'
        // }
        // this.appPages.push(fourMenu)

        // var item = 'Approve/Reject Cfo'

        this.appPages.push("Approve/Reject Cfo")
      }

      if (data[i].page_name == "travel_request_form_approved_ceo") {
        // var fourMenu = {
        //   title: 'Approve/Reject Ceo',
        //   // url: '/approve-reject/3',
        //   // icon: 'home'
        // }
        // this.appPages.push(fourMenu)
        // var item = 'Approve/Reject Ceo'

        this.appPages.push("Approve/Reject Ceo")
      }

    }

    var result = this.appPages.filter(function (a) {
      return !this[a] && (this[a] = true);
    }, Object.create(null));

    this.appPages = result


    console.log("this.appPages")
    console.log("this.appPages")
    console.log("this.appPages")
    console.log("this.appPages")
    console.log(this.appPages)
  }


  checkArrayVal(val) {
    // this.appPages
    var isPresent = false;

    for (let i = 0; i < this.appPages.length; i++) {
      if (this.appPages[i] == val) {
        isPresent = true;
      }
    }
    return isPresent;
  }


  logout() {
    this.localStorrage.clear();
    this.router.navigateByUrl('/login');

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


