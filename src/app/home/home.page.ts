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
  constructor(private activatedRoute: ActivatedRoute,
    private datePicker: DatePicker,
    public generalService: GeneralService,
    public events: Events,
    private router: Router,
    public localStorrage: Storage) { }

  ngOnInit() {
    // this.userType = this.activatedRoute.snapshot.paramMap.get('userType');
    console.log(this.userType)
    this.localStorrage.get("user_detail").then((res) => {
      this.events.publish('sidemenuEvent', res);

    })

  }



  openCalendar() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  gotoTravelRequest() {
    this.generalService.userRole = 0
    this.router.navigateByUrl("/add-travel-reqeust" + "/" + null + "/" + false + "/" + false);
  }

}
