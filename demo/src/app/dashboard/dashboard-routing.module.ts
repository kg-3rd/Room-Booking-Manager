import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from '../login/login.component';
import { RetrieveMeetingRoomInfoComponent } from '../retrieve-meeting-room-info/retrieve-meeting-room-info.component'


const DashboardRoutes: Routes = 
[
  // {
  //   path:'',
  //   component:DashboardComponent,
  //   children: [
  //     {path: '/retrieve-meeting-room-info', component: LoginComponent}
  //   ]
  // },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'retrieve-meeting-room-info',
    component:RetrieveMeetingRoomInfoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
