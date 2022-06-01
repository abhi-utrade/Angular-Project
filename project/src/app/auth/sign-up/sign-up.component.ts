import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide = true;
  formGroup!: FormGroup;


  constructor(private auth: AuthService, private router:Router) { 
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
    })
  }
  strtSignup(){
    if(this.formGroup.valid){
      console.log(this.formGroup.value)
      this.auth.signup(this.formGroup.value).subscribe(result =>{
        console.log(result);
        alert("Your Acccount is now registered");
        this.router.navigate(['/', 'signin']);
      },(error: HttpErrorResponse) => {
        if (error.status === 400 || error.status === 401)
          alert('Enter Correct Details');
          console.log(error.message);
     });
    }
  }
}
