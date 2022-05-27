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
  interval:any;
  //Getting API data from parent component
  @Input() apiData: any;
  //Passing button status to Price Depth Component
  @Output() onBtnClicked = new EventEmitter<boolean>();
  lastTradeTime:any;

  showPriceDepth() {
    this.onBtnClicked.emit(true);
  }

  constructor(public dialog: MatDialog, private sharedData:SymbolService) { }

  ngOnInit(): void {
    //Stored Static Data for card Elements
    this.apiData = {
      meta: {
        requested: 1,
        returned: 1
      },
      data: [
        {
          ticker: "Symbol",
          name: "Company Name",
          exchange_short: "Exchange",
          price: 0,
          day_change: 0,
          last_trade_time: "Last Trade Time"
        }
      ]
    };
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
    this.lastTradeTime = (this.apiData.data[0].last_trade_time).substring(0, 19);
    if(this.apiData.data[0].day_change < 0){
      dChange!.style.color = "red";
    }
    else if (this.apiData.data[0].day_change > 0){
      dChange!.style.color = "green";
    }

  }
  

}
