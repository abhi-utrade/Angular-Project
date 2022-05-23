import { Component, OnInit } from '@angular/core';
import { SymbolService } from '..//symbol.service';

export interface ScalperElement {
  myVol: any;
  bid: number;
  price: number;
  ask: number;
}


@Component({
  selector: 'app-depth-scalper',
  templateUrl: './depth-scalper.component.html',
  styleUrls: ['./depth-scalper.component.css']
})
export class DepthScalperComponent implements OnInit {
  ELEMENT_DATA: ScalperElement[] = [];
  displayedColumns: string[] = ['myVol','bid','price', 'ask'];
  ltpDepth:any[] = [];
  lastPrice:any = 100;
  apiData:any;
  priceDepthQty:any;
  bid: number[]=[];
  ask: number[]=[];
  buyQty:number[] = [];
  sellQty:number[] = [];
  bidData:any;
  askData:any;
  symbolName:any;

  constructor(private sharedData:SymbolService) {
    this.lastPrice = (Math.ceil((this.sharedData.sendData())*20)/20);
    this.symbolName = this.sharedData.sendName();
    this.depthGenerator(this.lastPrice);
    this.showData();

   }

   fetchData(){
    this.priceDepthQty = this.sharedData.sendQty();
    this.buyQty = this.priceDepthQty[0];
    this.sellQty = this.priceDepthQty[1];
    this.bid = this.priceDepthQty[2];
    this.ask = this.priceDepthQty[3];
   }

  depthGenerator(num:number){
    let num1 = num;
    for(let i = 0; i < 20; i++){
        num +=  0.05;
        this.ltpDepth.push((Math.round(num * 100)/100));
    }
    this.ltpDepth.reverse();
    this.ltpDepth.push(num1)
    for(let i = 0; i < 20; i++){
      num1 -=  0.05;
      this.ltpDepth.push((Math.round(num1 * 100)/100));
    }
  }
  clearArr(){
    this.bid = [];
    this.ask = [];
    this.buyQty = [];
    this.sellQty = [];
  }

  showData(){
    this.ELEMENT_DATA = [];
    this.fetchData();
    for(let i = 0; i < 30; i++){
      if(this.bid.includes(this.ltpDepth[i])){
        let bidIdx = this.bid.findIndex(b=> b === this.ltpDepth[i])
        this.bidData = this.buyQty[bidIdx];
      }
      if(this.ask.includes(this.ltpDepth[i])){
        let askIdx = this.ask.findIndex(b=> b === this.ltpDepth[i])
        this.askData = this.sellQty[askIdx];
      }
      this.ELEMENT_DATA.push({
        myVol: "",
        bid: this.bidData,
        price: this.ltpDepth[i],  
        ask: this.askData
      });
      this.bidData = "";
      this.askData = "";
    }
    
  }
  tableCeter(){
    let elmnt = document.getElementById(this.lastPrice);
    if(elmnt){
      elmnt.scrollIntoView({block: "center"});
      elmnt.style.background= "#bcf2f5";
    }
    
    
  }


  ngAfterViewChecked(){
    this.tableCeter();
  }
  ngOnInit(): void {
    setInterval(() => {
      this.showData();
  }, 3500);
    
  }

}
