import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  username: any;
  password: any;
  checkRemember: any = false
  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {

  }

  doLogin() {
    console.log(this.username)
    console.log(this.password)
    console.log(this.checkRemember)

    // this.router.navigateByUrl('/home');

  }

}
