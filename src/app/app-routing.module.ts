import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'add-travel-reqeust/:isReadOnly/:readData/:isApproveBtn', loadChildren: './add-travel-reqeust/add-travel-reqeust.module#AddTravelReqeustPageModule' },
  { path: 'my-travel-request', loadChildren: './my-travel-request/my-travel-request.module#MyTravelRequestPageModule' },
  { path: 'approve-reject/:userType', loadChildren: './approve-reject/approve-reject.module#ApproveRejectPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
