import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ApproveRejectPage } from './approve-reject.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveRejectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApproveRejectPage]
})
export class ApproveRejectPageModule {}
