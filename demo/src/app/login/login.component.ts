import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { apiService } from '../services/api.service';
import { Comments } from '../classes/comments';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _apiService: apiService, private _router: Router){}
  form = new FormGroup({  
    username: new FormControl('', Validators.required),  
    password: new FormControl('', Validators.required),
    // submit: new FormControl()
  });
  get username() {  
    return this.form.get('username');  
  } 
  get password() {  
    return this.form.get('password');  
  } 

  registerForm = new FormGroup({  
    userID: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),  
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    officeID: new FormControl('', Validators.required),
    // submit: new FormControl()
  });
  get userID() {  
    return this.registerForm.get('userID');  
  } 
  get firstname() {  
    return this.registerForm.get('firstname');  
  } 
  get lastname() {  
    return this.registerForm.get('lastname');  
  } 
  get email() {  
    return this.registerForm.get('email');  
  } 
  get officeID() {  
    return this.registerForm.get('officeID');  
  } 
  
  lstcomments:Comments[];
  users:User[];
  myForm = "login";
  tab:string;
  ngOnInit()
  {
    this.tab = "Register";
    this.myForm = "login";
    this._apiService.getcomments()
    .subscribe
    (
      data=>
      {
          this.lstcomments = data;//typecast data to list of comments 
          console.log(this.lstcomments);
      }
    )

    this._apiService.getUsers()
    .subscribe
    (
      data=>
      {
          this.users = data;//typecast data to list of comments 
          console.log(this.users);
      }
    )
   
  }
  
  switch()
  {
    if(this.myForm == "login")
    {
      this.myForm = "register";
      this.tab = "Login";
    }
    else if(this.myForm == "register")
    {
      this.myForm = "login";
      this.tab = "Register";
    }
  }
  _username:string;
  _password:string;
  _match:boolean;
  _exist = false;
  buttonLogin = "";
  buttonReg = "";

  onSubmit() 
  {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.get('username').value);
    console.warn(this.form.value);
    this._username = this.form.get('username').value;
    this._password = this.form.get('password').value;

    for(let i = 0; i < this.lstcomments.length; i++) 
    {
      
      if(this.lstcomments[i].Username == this._username)
      {
        console.log("Found");
        if(this.lstcomments[i].Password == this._password)
        {
          console.log("Passwords match");
          this._match = true;
          localStorage.setItem('loggedIn', "true");
          console.log(localStorage.getItem('loggedIn'));
          this._router.navigate(['dashboard']);
        }
        else
        {
          console.log("Wrong password!");
          this._match = false;
          this.password.reset();
          //this._router.navigate([`dashboard`]);
        }
      }
    }
    this.buttonLogin = "clicked";
  }

  onRegister()
  {
    
    //check if user already exists
    for(let i = 0; i < this.users.length; i++) 
    {
      
      if(this.users[i].userID == this.registerForm.get('userID').value)
      {
        this._exist = true;
      }
    }

    if(!this._exist)
    {
      var formData=new User();
        formData.userID=this.registerForm.get('userID').value;
        formData.FirstName=this.registerForm.get('firstname').value;
        formData.LastName=this.registerForm.get('lastname').value;
        formData.Email=this.registerForm.get('email').value;
        formData.officeRoomID=this.registerForm.get('officeID').value;
        

        // console.log(formData.userID + " - " + formData.firstName + " - " + formData.lastName + " - " + formData.email);
        this._apiService.registerUser(formData)
        .subscribe(
          data=>{
            console.log('Response post', data);
          }
        );
        // console.warn(this.RoomInfo.value)
        // console.log(this.RoomInfo.controls['RoomNumber'].value);//individual values
        //from here send json format to the DB 
        this._router.navigate(['dashboard']);
    }
    this.buttonReg ="clicked";
  }

}
