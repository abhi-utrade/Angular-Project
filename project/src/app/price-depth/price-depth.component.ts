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
    //Get API data from service component
    //this. apiData = this.sharedData.sendData();
    
    this.lastPrice = this.sharedData.sendData();
    this.showData();
    
    
   }
  
    //GenerateRandom number for bid & ask
  randomNumberGenerator(min:number, max:number) { 
    let num = Math.random() *(max - min) + min;
     num = num * 100;
    let x = num%10;
    num = num - x;
    if(x >= 5){
        x = 5;
    }
    else{
        x = 0;
    }
    num = num + x;
    num = num/100;

    return (+num.toFixed(2));
  }

  randomQtyGenerator(){
    for(let i = 0; i < 5; i++){
      this.buyQtyArr.push(this.quantityGenerator(1,1000));
      this.sellQtyArr.push(this.quantityGenerator(1,1000));
    }

  }

  //Generate quantity
  quantityGenerator(min:number, max:number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


//Present data to table
  showData(){
    this.ELEMENT_DATA = [];
    this.clearArr();
    this.randomQtyGenerator();
    //For Bid Array
    for(let i = 0; i < 5; i++ ){
      this.randomBid.push(this.randomNumberGenerator(this.lastPrice - 3.5, this.lastPrice));
    }
    this.randomBid.sort();
    this.randomBid.reverse();

    //For Ask array
    for(let i = 0; i < 5; i++ ){
      this.randomAsk.push(this.randomNumberGenerator(this.lastPrice, this.lastPrice + 3.5));
    }
    this.randomAsk.sort();
    
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

    this.sharedData.getQty(this.buyQtyArr, this.sellQtyArr, this.randomBid, this.randomAsk);

  }
/*

  
   fetchData(){
    this.priceDepthQty = this.sharedData.sendQty();
    this.buyQtyArr = this.priceDepthQty[0];
    this.sellQtyArr = this.priceDepthQty[1];
    this.randomBid = this.priceDepthQty[2];
    this.randomAsk = this.priceDepthQty[3];
   }


//Present data to table
  showData(){
    this.fetchData();
    console.log(this.randomBid);
    this.ELEMENT_DATA = [];
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

*/
clearArr(){
  this.randomBid = [];
  this.randomAsk = [];
  this.buyQtyArr = [];
  this.sellQtyArr = [];
}

  ngOnInit(): void {
    setInterval(() => {
      this.showData();
  }, 5000);
  }

}
