import { Component } from '@angular/core';
import { SymbolService } from '../services/symbol.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  getWatchList() {
    throw new Error('Method not implemented.');
  }


  title = 'project';
  priceDepthShow = false;
  watchShow = true;

  apiDataReceived:boolean = false;
  
  constructor(private symbol:SymbolService) { 
    this.symbol.getStatus().subscribe(data =>{
      this.apiDataReceived = data;
      this.watchShow = !this.apiDataReceived;
    });
    }

}
