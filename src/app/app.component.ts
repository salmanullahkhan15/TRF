import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GeneralService } from './general.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [

  ];


  userName: any = "";
  userDesignation: any = ""
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public generalService: GeneralService,
    public events: Events,
    private router: Router,
    public localStorrage: Storage
  ) {
    this.initializeApp();

    this.events.subscribe('sidemenuEvent', (data) => {
      this.manageSideMenu(data)
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  manageSideMenu(data) {

    this.userName = data[0].Usr_Name
    this.userDesignation = data[0].Group_Name



    this.appPages = []


    var oneMenu = {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
    this.appPages.push(oneMenu)

    var twoMenu = {
      title: 'Add Travel Request',
      url: '/add-travel-reqeust',
      icon: 'home'
    }
    this.appPages.push(twoMenu)

    var threeMenu = {
      title: 'My Travel Request',
      url: '/my-travel-request',
      icon: 'home'
    }
    this.appPages.push(threeMenu)

    for (let i = 0; i < data.length; i++) {

      if (data[i].page_name == "travel_request_form_approved_head") {
        var fourMenu = {
          title: 'Approve/Reject Head',
          url: '/approve-reject/4',
          icon: 'home'
        }
        this.appPages.push(fourMenu)
      }

      if (data[i].page_name == "travel_request_form_approved_cfo") {
        var fourMenu = {
          title: 'Approve/Reject Cfo',
          url: '/approve-reject/2',
          icon: 'home'
        }
        this.appPages.push(fourMenu)
      }

      if (data[i].page_name == "travel_request_form_approved_ceo") {
        var fourMenu = {
          title: 'Approve/Reject Ceo',
          url: '/approve-reject/3',
          icon: 'home'
        }
        this.appPages.push(fourMenu)
      }

    }

    var result = this.appPages.filter(function (a) {
      return !this[a.url] && (this[a.url] = true);
    }, Object.create(null));

    this.appPages = result

  }

  gotoUrl(url) {
    if (url == "/add-travel-reqeust") {
      var isReadOnly = false;
      this.router.navigateByUrl(url + "/" + isReadOnly);
    } else {
      this.router.navigateByUrl(url);
    }
  }


  logout() {
    this.localStorrage.clear();
    this.router.navigateByUrl('/login');

  }
}
