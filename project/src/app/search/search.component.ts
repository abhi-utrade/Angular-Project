import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SymbolService } from '../symbol.service'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //To store data from api
  apiData:any;
  //Get Symbol name from Search
  symbolName!:string;
  getSymbol(val:string){
    if(val == undefined){
      alert("Enter Correct Symbol")
      return;
    }
    this.symbolName = val;
    this.apiCall();
    
  }
    

  constructor(private symbol:SymbolService) { }
   

  //Pssing API data to Parent
  @Output() msgEvent = new EventEmitter<any>();
  sendMsg() { this.msgEvent.emit(this.apiData)}

  //API CALL after getting data from search
  apiCall(){
    this.symbol.getSymbolData(this.symbolName).subscribe(data=>
      {
        this.apiData = data
        this.sendMsg();
        //Passing API data to service for Price Depth & Depth Scalper
        this.symbol.getData(this.apiData);
      }
      )
            
  }


  ngOnInit(): void {
    
  }
  

}


