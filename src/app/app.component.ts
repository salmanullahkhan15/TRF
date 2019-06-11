import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GeneralService } from './general.service';

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

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public generalService: GeneralService,
    public events: Events

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
    } else if (this.generalService.userTypeGlobal == 2 || this.generalService.userTypeGlobal == 3) {
      this.appPages = [
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
}
