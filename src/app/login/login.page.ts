import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  username: any;
  password: any;
  checkRemember: any = false;
  constructor(private router: Router, private navCtrl: NavController, public toastController: ToastController) { }

  ngOnInit() {

  }

  doLogin() {
    console.log(this.username);
    console.log(this.password);
    console.log(this.checkRemember);

    if (this.password == "1234") {

      var userType = 0;
      if (this.username == 'employe' && this.password == "1234") {
        userType = 1;
      } else if (this.username == 'cfo' && this.password == "1234") {
        userType = 2;
      }
      else if (this.username == 'ceo' && this.password == "1234") {
        userType = 3;
      }

      this.router.navigateByUrl('/home/' + userType);

    }else{
      this.presentToast();
    }

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Invalid username or password',
      duration: 2000
    });
    toast.present();
  }

}
