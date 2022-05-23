import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SymbolService{
  apiData:any;
  randomBid: number[]=[];
  randomAsk: number[]=[];
  priceShare:any;
  buyQtyArr:number[] = [];
  sellQtyArr:number[] = [];

  

  constructor(private http:HttpClient) { }

  
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
    this.buyQtyArr = [];
    this.sellQtyArr = [];
    for(let i = 0; i < 5; i++){
      this.buyQtyArr.push(this.quantityGenerator(1,1000));
      this.sellQtyArr.push(this.quantityGenerator(1,1000));
    }
  }

  //Generate quantity
  quantityGenerator(min:number, max:number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  generateData(lastPrice:any){
    this.randomBid = [];
    this.randomAsk = [];
    //For Bid Array
    for(let i = 0; i < 5; i++ ){
      this.randomBid.push(this.randomNumberGenerator(lastPrice - 5.5, lastPrice));
    }
    this.randomBid.sort();
    this.randomBid.reverse();
    
    
    

    //For Ask array
    for(let i = 0; i < 5; i++ ){
      this.randomAsk.push(this.randomNumberGenerator(lastPrice, lastPrice + 5.5));
    }
    this.randomAsk.sort();
    
  }

  showData(lP:any){
    let lastPrice = lP;
    this.priceShare = lastPrice;
    this.generateData(lastPrice);
    this.randomQtyGenerator();
  }

  getData(data:any){
    this.apiData = data;
    let lastPrice = this.apiData.data[0].price;
     this.showData(lastPrice);
     setInterval(() => {
       this.showData(lastPrice);
   }, 6000);
  }

  
  sendData(){
    let lp = this.apiData.data[0].price;
    return lp;
    
  }
  sendName(){
    return this.apiData.data[0].ticker;
  }

  sendQty(){
    return [this.buyQtyArr, this.sellQtyArr, this.randomBid, this.randomAsk,this.priceShare];
  }

  //Calling API and passing it
  getSymbolData(symbolName:string){
    let url = `https://api.stockdata.org/v1/data/quote?symbols=${symbolName}&api_token=M7FUkY904hxEswqNZjJJ3WECnXOhxpKgKHcPnaJm`;
    return this.http.get(url);
  }

}
