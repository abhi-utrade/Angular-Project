import { Component, OnInit, Input } from '@angular/core';
import { SymbolService } from '..//symbol.service';

//Initialised Table colums using interface
export interface PDElement {
  buyQty: number;
  buyOrder: number;
  bid: number;
  ask: number;
  sellOrder: number;
  sellQty:number;

}


@Component({
  selector: 'app-price-depth',
  templateUrl: './price-depth.component.html',
  styleUrls: ['./price-depth.component.css']
})

export class PriceDepthComponent implements OnInit {
  
  ELEMENT_DATA: PDElement[] = [];
  randomBid: number[]=[];
  randomAsk: number[]=[];
  lastPrice:any;
  buyQtyArr:number[] = [];
  sellQtyArr:number[] = [];
  priceDepthQty:any;
  interval:any;
  bidObservable$: any;
  
  //Display Column of Table
  displayedColumns: string[] = ['buyQty', 'buyOrder', 'bid', 'ask', 'sellOrder', 'sellQty'];

  constructor(private sharedData:SymbolService) {
    
    this.lastPrice = this.sharedData.sendData();
    this.showData();
    
    
   }

  
   fetchData(){
    this.priceDepthQty = this.sharedData.sendQty();
    if(this.lastPrice == this.priceDepthQty[4]){
      this.buyQtyArr = this.priceDepthQty[0];
      this.sellQtyArr = this.priceDepthQty[1];
      this.randomBid = this.priceDepthQty[2];
      this.randomAsk = this.priceDepthQty[3];
    }
    else{
      this.lastPrice = this.sharedData.sendData();
    } 
    
   }


//Present data to table
  showData(){
    this.ELEMENT_DATA = [];
    this.fetchData();
    for(let i = 0; i < 5; i++){
      this.ELEMENT_DATA.push({
        buyQty: this.buyQtyArr[i], 
        buyOrder: 0, 
        bid: this.randomBid[i], 
        ask: this.randomAsk[i], 
        sellOrder: 0, 
        sellQty: this.sellQtyArr[i]
      });
    }
    
  }


clearArr(){
  this.randomBid = [];
  this.randomAsk = [];
  this.buyQtyArr = [];
  this.sellQtyArr = [];
}

  ngOnInit(): void {
    setInterval(() => {
      this.showData();
  }, 1000);
  }

}
