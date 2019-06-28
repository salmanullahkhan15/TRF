import { Injectable } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
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
  API_POST_USER_FORM = "Home/InsertApplication"
  API_GET_LAST_TRF_ID = "home/GetLastTRF_ID"

  API_GET_USER_APPROVED_FORMS = "home/GetApprovedRequests?username="

  API_GET_USER_PENDING_FORMS = "home/GetrejectRequests?username="

  API_GET_HEAD_APPROVAL_LIST = "Home/GetHeadApproval?Username="


  API_GET_CFO_APPROVAL_LIST = "Home/GetCFOApproval"


  API_GET_CEO_APPROVAL_LIST = "Home/GetCEOPendingApprovals"


  API_GET_APPLICATION_BY_TRFNUM = "Home/GetApplicationInputs?TRFNum="

  API_APPROVE_BY_CEO = "Home/PostCEOApproval?"

  API_APPROVE_BY_CFO = "Home/PostCFORejection?"

  API_APPROVE_BY_HEAD = "Home/PostHeadRejection?"


  API_GET_BUDGET = "Home/GetBudgetBalance?TRFNum="

  API_GET_TRANSPORT_HOTEL_PRICE = "Home/GetHotelAndTransportPrice?Type="

  API_GET_AIRLINE_PRICE = "Home/GetAirlinePrice?Destination="


  API_GET_VISA_PRICE = "Home/GetVisaPrice?Destination="


  API_POST_EXTRA_FORM_DATA = "Home/InsertExpenses?"


  //   Home/PostCFORejection
  // Home / PostHeadRejection

  userRole: any = 0
  constructor(public http: HttpClient, public localStorrage: Storage, public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private router: Router,
    public toastController: ToastController
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


  postRequestUrl(url) {
    return new Promise(resolve => {
      // this.localStorrage.get(Constants.USER_LOG_TOKEN).then((res) => {

      var resp;
      this.http.post(this.BASE_URL + url, null)
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
    let response6 = this.http.get(this.BASE_URL + this.API_GET_LAST_TRF_ID);

    return forkJoin([response1, response2, response3, response4, response5, response6]);

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
