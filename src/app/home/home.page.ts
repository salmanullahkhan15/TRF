import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userType: any;
  constructor(private activatedRoute: ActivatedRoute,
    public events: Events,
    public localStorrage: Storage,
    private datePicker: DatePicker) { }

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



}
