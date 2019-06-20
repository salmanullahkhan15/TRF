import { Injectable } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoginPage } from './login/login.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { forkJoin, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  userTypeGlobal = 0

  BASE_URL = "http://mytravelrequest.com/"

  API_LOGIN = "Home/CheckLogin?";
  API_USER_DETAIL = "Home/GetEmployeeDetails?Username="
  API_GET_DESTINATIONS = "Home/GetDestinations"
  API_GET_FLIGHTS = "Home/GetFlights"
  API_GET_CLIENTS = "Home/GetClients"
  API_GET_GET__REASON_PURPOSE = "Home/GetPurpose"
  API_GET_PE_LIST = "Home/GetPEListClientWise?ClientName="


  // /Home/GetDestinations
  // /Home/GetFlights
  // /Home/GetClients
  // /Home/GetPurpose

  constructor(public http: HttpClient, public localStorrage: Storage, public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private router: Router
  ) { }


  getRequest(url) {
    return new Promise(resolve => {
      // this.localStorrage.get(Constants.USER_LOG_TOKEN).then((res) => {

      var resp;
      this.http.get(this.BASE_URL + url)
        .subscribe((res) => {
          console.log(res)
          resp = res;
          resolve(resp)
        }, (err) => {
          console.log(err, 'err')
          if (err.status == 0) {
            this.presentErrorAlert()
          }
          resolve(err)
        })
      // })
    })
  }


  postRequest(url, data) {
    return new Promise(resolve => {
      // this.localStorrage.get(Constants.USER_LOG_TOKEN).then((res) => {

      this.http.post(this.BASE_URL + url, data)
        .subscribe((res) => {
          console.log(res, ' res')

          resolve(res)
        }, (err) => {
          console.log(err, 'err')
          if (err.status == 0) {
            this.presentErrorAlert()
          }
          resolve(err)
        })
      // })
    })
  }


  presentErrorAlert() {
    var alert = this.alertCtrl.create({
      message: 'There seem to be some issue with your internet connection. Please check your connection',
      buttons: [
        {
          text: 'Retry',
          handler: () => {
            // this.app.getRootNav().setRoot(LoginPage, {}, { animate: true, animation: "wp-transition" });
            this.router.navigateByUrl("/");

          }
        }
      ]
    });

  }
  // /GetPEListClientWise?ClientName=aarora123
  // /Home/GetAirlinePrice?Destination=Islamabad


  // /Home/GetDestinations
  // /Home/GetFlights
  // /Home/GetClients
  // /Home/GetPurpose
  // /Home/GetEmployeeDetails?Username=farhan.arif


  // Example:http://mytravelrequest.com/Home/GetPEListClientWise?ClientName=aarora123


  getData(userName): Observable<any> {

    let response1 = this.http.get(this.BASE_URL + this.API_USER_DETAIL + userName);
    let response2 = this.http.get(this.BASE_URL + this.API_GET_DESTINATIONS);
    let response3 = this.http.get(this.BASE_URL + this.API_GET_FLIGHTS);
    let response4 = this.http.get(this.BASE_URL + this.API_GET_CLIENTS);
    let response5 = this.http.get(this.BASE_URL + this.API_GET_GET__REASON_PURPOSE);

    return forkJoin([response1, response2, response3, response4, response5]);

  }

}
