import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userType: any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userType = this.activatedRoute.snapshot.paramMap.get('userType');
    console.log(this.userType)
  }


}
