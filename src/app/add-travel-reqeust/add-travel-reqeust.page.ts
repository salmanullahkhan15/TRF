import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-travel-reqeust',
  templateUrl: './add-travel-reqeust.page.html',
  styleUrls: ['./add-travel-reqeust.page.scss'],
})
export class AddTravelReqeustPage implements OnInit {
  staffCode: string;
  pageTitle: string;
  isReadOnly: boolean = false;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.staffCode = "0001"
    this.isReadOnly = this.activatedRoute.snapshot.paramMap.get('isReadOnly') == "true" ? true : false
    console.log(this.isReadOnly)
    this.pageTitle = this.isReadOnly ? "Travel Request Detail" : "Add Travel Request"
  }

}
