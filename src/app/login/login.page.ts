import { GeneralService } from './../general.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // CFO = 2
  // CEO = 3
  // HEAD = 4

  username: any;
  password: any;
  checkRemember: any = false;
  constructor(private router: Router, private navCtrl: NavController, public toastController: ToastController, public generalService: GeneralService, public events: Events,
    public localStorrage: Storage) { }

  ngOnInit() {

    this.localStorrage.get("user_detail").then((res) => {
      console.log(res)
      if (res != null) {
        this.router.navigateByUrl('/home');
      }
    })

  }

  doLogin() {
    console.log(this.username);
    console.log(this.password);
    console.log(this.checkRemember);
    this.generalService.getRequest(this.generalService.API_LOGIN + "Username=" + this.username + "&Password=" + this.password).then((res) => {
      console.log(res)
      this.localStorrage.set("user_detail", res).then((res) => {
        this.router.navigateByUrl('/home');
        this.events.publish('sidemenuEvent', res);

        // Group_Name: "admin"
        // Group_Name1: "admin"
        // PKID: 1
        // PKID1: 1
        // Status: true
        // Status1: true
        // Updated_by1: "hammad"
        // Updated_on1: "2018-01-30T23:57:00"
        // Usr_Name: "hammad.hammad"
        // page_name: "admin_department_travel_form"
        // updated_by: "hammad.hammad"
        // updated_on: "2018-09-20T22:07:00"



      })
    })


  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Invalid username or password',
      duration: 2000
    });
    toast.present();
  }

}
