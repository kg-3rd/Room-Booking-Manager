import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { apiService } from '../services/api.service';
import { roomsService } from '../services/rooms.service';
import {Room} from '../classes/room';
//import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-meeting-room-info',
  templateUrl: './edit-meeting-room-info.component.html',
  styleUrls: ['./edit-meeting-room-info.component.css']
})
export class EditMeetingRoomInfoComponent implements OnInit {

  constructor(private apiDB: apiService,public dialogRef:MatDialogRef<EditMeetingRoomInfoComponent>,private mRoom:roomsService) { }
  get getRoom():Room
  {
    return this.mRoom.myRoom;
  }
  RoomInfo=new FormGroup({
    RoomNumber:new FormControl(''),
    FloorNumber:new FormControl(''),
    Amenity:new FormControl(''),
    NrSeats:new FormControl(''),
    Distance:new FormControl('')
  });
  get RoomNumber() {  
    return this.RoomInfo.get('RoomInfo');  
  } 
  ngOnInit(): void {
    this.RoomInfo.controls['RoomNumber'].setValue(this.getRoom.roomID);
    this.RoomInfo.controls['FloorNumber'].setValue(this.getRoom.FloorNumber);
    this.RoomInfo.controls['Amenity'].setValue(this.getRoom.Amenities);
    this.RoomInfo.controls['NrSeats'].setValue(this.getRoom.numParticipants);
    this.RoomInfo.controls['Distance'].setValue(this.getRoom.Distance);
    //console.log(this.getRoom.Amenities + " - " + this.RoomInfo.controls['RoomNumber'].value);
  }
  
  updateR(){
    var formData=new Room();
    formData.roomID=<number><any>this.RoomInfo.controls['RoomNumber'].value;
    formData.Amenities=<string><any>this.RoomInfo.controls['Amenity'].value;
    formData.FloorNumber=<number><any>this.RoomInfo.controls['FloorNumber'].value;
    formData.Distance=<number><any>this.RoomInfo.controls['Distance'].value;
    formData.numParticipants=<number><any>this.RoomInfo.controls['NrSeats'].value;

    //console.log("no seats",<number><any>this.RoomInfo.controls['NrSeats'].value);
    this.apiDB.updateRoom(formData)
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
    //window.location.reload();
  }
}
