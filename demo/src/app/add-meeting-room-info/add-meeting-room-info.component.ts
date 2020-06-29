import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { apiService } from '../services/api.service';
import {Room} from '../classes/room';
//import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meeting-room-info',
  templateUrl: './add-meeting-room-info.component.html',
  styleUrls: ['./add-meeting-room-info.component.css']
})
export class AddMeetingRoomInfoComponent implements OnInit {

  //constructor(private apiDB: apiService,public dialogRef:MatDialogRef<AddMeetingRoomInfoComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  constructor(private _router: Router,private apiDB: apiService,public dialogRef:MatDialogRef<AddMeetingRoomInfoComponent>) { }
  RoomInfo=new FormGroup({
    RoomNumber:new FormControl(''),
    FloorNumber:new FormControl(''),
    Amenity:new FormControl(''),
    NrSeats:new FormControl(''),
    Distance:new FormControl('')
  });
  ngOnInit(): void {
    if(localStorage.getItem('loggedIn') == "false")
    {
      this._router.navigate(['login']);
    }
  }

  onSubmit(){
    var formData=new Room();
    formData.roomID=<number><any>this.RoomInfo.controls['RoomNumber'].value;
    formData.Amenities=<string><any>this.RoomInfo.controls['Amenity'].value;
    formData.FloorNumber=<number><any>this.RoomInfo.controls['FloorNumber'].value;
    formData.Distance=<number><any>this.RoomInfo.controls['Distance'].value;
    formData.numParticipants=<number><any>this.RoomInfo.controls['NrSeats'].value;

    //console.log("no seats",<number><any>this.RoomInfo.controls['NrSeats'].value);
    this.apiDB.post(formData)
    .subscribe(
      data=>{
        console.log('Response post', data);
      }
    );
    // console.warn(this.RoomInfo.value)
    // console.log(this.RoomInfo.controls['RoomNumber'].value);//individual values
    //from here send json format to the DB 
    this.onClose();
  }
  onClose(){
    this.dialogRef.close();
  }

}
