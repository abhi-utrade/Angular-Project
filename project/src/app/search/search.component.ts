import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SymbolService } from '../services/symbol.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  //Get Symbol name from Search
  getSymbol(val:string){
    if(val == undefined){
      return;
    }
    let symbolName = val;
    this.symbol.setApiData(symbolName);
  }
  
  constructor(private symbol:SymbolService) {    
   }
  
  ngOnInit(): void {}
  
  //Interval
  //    setInterval(() => {
  //      this.apiCall();
  //  }, 20000);
}


