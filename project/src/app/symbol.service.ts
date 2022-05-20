import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SymbolService {
  apiData:any;
  buyQtyArr:number[] = [];
  sellQtyArr:number[] = [];
  randomBid: number[]=[];
  randomAsk: number[]=[];
  getData(data:any){
    this.apiData = data;
    
  }
  sendData(){
    return this.apiData.data[0].price;
  }

  getQty(buyQty:any,sellQty:any,bid:any,ask:any){
    this.buyQtyArr = buyQty;
    this.sellQtyArr = sellQty;
    this.randomBid = bid;
    this.randomAsk = bid;
    console.log(this.buyQtyArr);
    console.log(this.sellQtyArr);
    console.log(this.randomBid);
    console.log(this.randomAsk);

  }

  constructor(private http:HttpClient) { 
  }
  //Calling API and passing it
  getSymbolData(symbolName:string){
    let url = `https://api.stockdata.org/v1/data/quote?symbols=${symbolName}&api_token=KMQHk2c0F25mW6h3A5KX9fCxsiyvD9eDiduLMWsB`;
    return this.http.get(url);
  }
}
