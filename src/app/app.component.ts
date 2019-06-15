import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GeneralService } from './general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Add Travel Request',
      url: '/add-travel-reqeust',
      icon: 'home'
    },
    {
      title: 'My Travel Request',
      url: '/my-travel-request',
      icon: 'home'
    },
    {
      title: 'Approve/Reject',
      url: '/approve-reject',
      icon: 'home'
    },
    {
      title: 'Logout',
      url: '/',
      icon: 'home'
    }
  ];


  userName: any = "";
  userDesignation: any = ""
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public generalService: GeneralService,
    public events: Events,
    private router: Router
  ) {
    this.initializeApp();

    this.events.subscribe('sidemenuEvent', (data) => {
      console.log('testevent');
      console.log(data);
      this.manageSideMenu()
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  manageSideMenu() {

    console.log("asdfasdf")
    console.log(this.generalService.userTypeGlobal)
    console.log(this.generalService.userTypeGlobal)
    console.log(this.generalService.userTypeGlobal)

    if (this.generalService.userTypeGlobal == 1) {
      this.userName = "Ahmed"
      this.userDesignation = "Employee"
      this.appPages = [
        {
          title: 'Add Travel Request',
          url: '/add-travel-reqeust',
          icon: 'home'
        },
        {
          title: 'My Travel Request',
          url: '/my-travel-request',
          icon: 'home'
        },
        {
          title: 'Logout',
          url: '/',
          icon: 'home'
        }
      ];
    } else if (this.generalService.userTypeGlobal == 2) {
      this.userName = "Jawad"
      this.userDesignation = "CFO"

      this.appPages = [
        {
          title: 'Add Travel Request',
          url: '/add-travel-reqeust',
          icon: 'home'
        },
        {
          title: 'My Travel Request',
          url: '/my-travel-request',
          icon: 'home'
        },
        {
          title: 'Approve/Reject',
          url: '/approve-reject',
          icon: 'home'
        },
        {
          title: 'Logout',
          url: '/',
          icon: 'home'
        }
      ];
    }
    else if (this.generalService.userTypeGlobal == 3) {
      this.userName = "Imran"
      this.userDesignation = "CEO"
      this.appPages = [
        {
          title: 'Add Travel Request',
          url: '/add-travel-reqeust',
          icon: 'home'
        },
        {
          title: 'My Travel Request',
          url: '/my-travel-request',
          icon: 'home'
        },
        {
          title: 'Approve/Reject',
          url: '/approve-reject',
          icon: 'home'
        },
        {
          title: 'Logout',
          url: '/',
          icon: 'home'
        }
      ];
    }

    else if (this.generalService.userTypeGlobal == 4) {
      this.userName = "Zeeshan"
      this.userDesignation = "HEAD"

      this.appPages = [
        {
          title: 'Add Travel Request',
          url: '/add-travel-reqeust',
          icon: 'home'
        },
        {
          title: 'My Travel Request',
          url: '/my-travel-request',
          icon: 'home'
        },
        {
          title: 'Approve/Reject',
          url: '/approve-reject',
          icon: 'home'
        },
        {
          title: 'Logout',
          url: '/',
          icon: 'home'
        }
      ];
    }

  }

  gotoUrl(url) {
    if (url == "/add-travel-reqeust") {
      var isReadOnly = false;
      this.router.navigateByUrl(url + "/" + isReadOnly);
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
