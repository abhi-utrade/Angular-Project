import { Component} from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent{
  

  title = 'project';
  toggleStepper = false;
  constructor() { }

  //Passing API data to card Component from Search Component 
  message:any;
  receiveMsg($event:any){
    this.message= $event
  }

}
