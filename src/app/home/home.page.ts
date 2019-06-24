import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userType: any;
  constructor(private activatedRoute: ActivatedRoute,
    public events: Events,
    public localStorrage: Storage) { }

  ngOnInit() {
    // this.userType = this.activatedRoute.snapshot.paramMap.get('userType');
    console.log(this.userType)
    this.localStorrage.get("user_detail").then((res) => {
      this.events.publish('sidemenuEvent', res);

    })

  }







}
