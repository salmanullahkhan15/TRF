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

    // this.appPages = [
    //   "Add Travel Request",
    //   "My Travel Request",
    //   "Approve/Reject Ceo",
    //   "Approve/Reject Cfo",
    //   "Approve/Reject Head"
    // ]

  }

  ionViewWillEnter() {
    this.localStorrage.get("user_detail").then((res) => {
      // this.events.publish('sidemenuEvent', res);
      console.log(res)
      this.manageSideMenu(res)

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


    console.log(this.userDesignation)
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










// app ka icon change karna hay.
// splash screen change karni hay.
// app install karnay k bad jo scree naati hay wo login hwi hwi aati hay bagair login kye us m (travel request, my request, logout) k button aarahy hain jab k login aana chaiyeh


// font same use karnay hain designer walay 
// LOGIN ka button k font chotay karain like (Login)
// place holder m USERNAME ko small m kardein
// place holder m PASSWORD ko small m kardein


// home par box k sizes chotay hogaye hain usay designer file jitnay banain.


// logout ka button bara aaraha hay usay chota karin sab ek jitnay button banain.


// prefferable time from m time 9 bajay kja select karnay par 21:000 aaraha hay jab ka 09:00 aana chaiyeh
// aur preferable time from second walay m 6 select karnay par 18:0 aaraha hay 
// time ko 12 hours par kardein
// preferable time from srf ek bar hay baki sab To,To,To hay.


// Hotel price nai aarahay. (need to check)
// form inserted successfully k bad us ko wapis shuru m lejain another words addtravel ko reload kardein. (need to check)
// time ki sara data  DB m NaN:NaN ja raha hay. (need to check)


// head ki list m request select karnay par jab request open hoti hay to header par (travel request detail) likha hwa aaraha hay wahan (TRF detail for Head) kardein. 

// aur head par jo by default tab open hoga wo first wala hoga means (Budget Information). 


// list ka style abhi b designer file k hisab say nai.




// head k approve k button k click k bad message aata hay k update successfully but kuch update nai horaha. aur hi rejetc par kuch update horahah hay. (need to check)



// chargeable to client m app k valye (yes) aarahai hay jabkay last time b theek karwaya tha (Yes) hoga aur no (No) hoga first letter hamesha capital hoga har kisi m. warna data hamara kbi b theek nai ayega.(HOLD)

// domestic ka Domestic hona chaiyeh. (HOLD)

// Head Pending par janay k bad jo screen aati hay wahan header par approve reject head likha hwa aaraha hay jabkay (Head Pending request) likha hwa aana chaiyeh.

// Head Approved par janay k bad jo screen aati hay wahan header par approve reject head likha hwa aaraha hay jabkay (Head Approved request) likha hwa aana chaiyeh.


// Ye m shayad tesri bar app ko bata raha hoon k CFO k pas jo list ayegi wo CEO ki tarha hogi sab ko ek sath select kar k approve ka button daba dega waha form open nai hoga Head ki tarha.  (pending)Ï

// CFO Pending par janay k bad jo screen aati hay wahan header par approve reject cfo likha hwa aaraha hay jabkay (CFO Pending request) likha hwa aana chaiyeh.

// CFO Approved par janay k bad jo screen aati hay wahan header par approve reject head likha hwa aaraha hay jabkay (CFO Approved request) likha hwa aana chaiyeh.

// cfo ko Capital letter m karain CFO.

// CFO ki date aagai haya jahan NaN aaraha tha. (need to check)

// Db m time jo NaN jaraha hay wo app k time ka format theek nai usay 10:10, 04:05 is tarha k format m bhejain. (need to check)