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
  lastPrice:any;
  buyQtyArr:number[] = [];
  sellQtyArr:number[] = [];

  

  constructor(private http:HttpClient) { }

  /*
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

  generateData(){
    //For Bid Array
    for(let i = 0; i < 5; i++ ){
      this.randomBid.push(this.randomNumberGenerator(this.lastPrice - 5.5, this.lastPrice));
    }
    this.randomBid.sort();
    this.randomBid.reverse();
    

    //For Ask array
    for(let i = 0; i < 5; i++ ){
      this.randomAsk.push(this.randomNumberGenerator(this.lastPrice, this.lastPrice + 5.5));
    }
    this.randomAsk.sort();
    
  }
*/

  getData(data:any){
    this.apiData = data;
    this.lastPrice = this.apiData.data[0].price;
  }
  sendData(){
    return this.lastPrice;
    
    
  }
  getQty(buyQtyArr:any, sellQtyArr:any, randomBid:any, randomAsk:any){
    this.buyQtyArr = buyQtyArr;
    this.sellQtyArr = sellQtyArr; 
    this.randomBid = randomBid; 
    this.randomAsk = randomAsk;
  }

  sendQty(){
    return [this.buyQtyArr, this.sellQtyArr, this.randomBid, this.randomAsk];
  }

  //Calling API and passing it
  getSymbolData(symbolName:string){
    let url = `https://api.stockdata.org/v1/data/quote?symbols=${symbolName}&api_token=DGPC7m9oYaDji0OvuIvkeDW21LHWYWQE42qoA20R`;
    return this.http.get(url);
  }

}
