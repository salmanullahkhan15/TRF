import { GeneralService } from './../general.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, Events, LoadingController } from '@ionic/angular';
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
    public localStorrage: Storage, public loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.localStorrage.get("user_detail").then((res) => {
      console.log(res)
      if (res != null) {
        this.router.navigateByUrl('/home');
      }
    })

  }

  async doLogin() {
    console.log(this.username);
    console.log(this.password);
    console.log(this.checkRemember);

    const loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await loading.present();

    this.generalService.getRequest(this.generalService.API_LOGIN + "Username=" + this.username + "&Password=" + this.password).then((res) => {
      console.log(res)
      loading.dismiss();

      if (res[0].Usr_Name == this.username) {
        this.localStorrage.set("user_detail", res).then((res) => {
          this.router.navigateByUrl('/home');
          this.events.publish('sidemenuEvent', res);
        })

      } else {
        this.generalService.presentToast('Invalid username or password')
      }


    })


  }



}
