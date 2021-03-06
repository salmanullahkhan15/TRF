import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AddTravelReqeustPage } from './add-travel-reqeust.page';

// import { AddTravelReqeustPage } from './add-travel-reqeust.page';

const routes: Routes = [
  {
    path: '',
    component: AddTravelReqeustPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTravelReqeustPage]
})
export class AddTravelReqeustPageModule { }
