import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  hide = true;
  formGroup!: FormGroup;
  
  constructor(private auth: AuthService) { }


  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    })
  }

  strtLogin(){
    if(this.formGroup.valid){
      this.auth.signin(this.formGroup.value).subscribe(result =>{
        console.log(result);
        this.auth.token = result.access;
        this.auth.openDashboard()
      },(error: HttpErrorResponse) => {
       if (error.status === 400 || error.status === 401)
         alert('Invalid Credentials');
    });
    }
  }

}
