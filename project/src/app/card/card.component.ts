import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepthScalperComponent } from '../depth-scalper/depth-scalper.component';
import { SymbolService } from '../services/symbol.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  @Output() openPriceDepth = new EventEmitter<boolean>();
  @Output() openWatchList = new EventEmitter<boolean>();
  lastTradeTime:any;
  apiData:any;

  //Event Emitter to show price depth
  showPriceDepth() {
    this.openPriceDepth.emit(true);
  }
    //Event Emitter to goto watchlist
  goToWatch(){
    //console.log("Back called");
    this.openWatchList.emit(true);
  }
  

  constructor(public dialog: MatDialog, private sharedData:SymbolService) { }

  ngOnInit(): void {
    this.sharedData.getApiData().subscribe(data =>{
      this.apiData = data;
      this.lastTradeTime = (this.apiData.data[0].last_trade_time).substring(0, 19); 
    });
     
  }
  
  //Function to open Dialog Box to show depth scalper
  openDialog() {
    if(this.apiData.data[0].price == 0){
      console.log("Debug")
      return;
    }
    this.dialog.open(DepthScalperComponent, {
      hasBackdrop: false
    })
  }

  ngAfterViewChecked(){
    let dChange = document.getElementById("dayCng");
    if(this.apiData.data[0].day_change < 0){
      dChange!.style.color = "red";
    }
    else if (this.apiData.data[0].day_change > 0){
      dChange!.style.color = "green";
    }
  }

  addToWatchlist(){
    this.sharedData.createWatchlist(this.apiData.data[0].ticker);
  }


}
