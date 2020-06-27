import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    // this._router.navigate(['retrieve-meeting-room-info']);
  }

  retrieve(): void
  {
    // this._router.navigate(['retrieve-meeting-room-info']);
    this._router.navigate(['dashboard/retrieve-meeting-room-info']);
  }
}
