import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-travel-reqeust',
  templateUrl: './add-travel-reqeust.page.html',
  styleUrls: ['./add-travel-reqeust.page.scss'],
})
export class AddTravelReqeustPage implements OnInit {
  staffCode: string;

  constructor() { }

  ngOnInit() {
    this.staffCode = "0001"
  }

}
