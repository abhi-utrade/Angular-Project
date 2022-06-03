import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
@Injectable()
export class SymbolService {
  // apiData:any;
  randomBid = new BehaviorSubject<number[]>([]);
  randomAsk = new BehaviorSubject<number[]>([]);
  priceShare = new BehaviorSubject<any>(1);
  buyQtyArr = new BehaviorSubject<number[]>([]);
  sellQtyArr = new BehaviorSubject<number[]>([]);
  pdApi: any;
  constructor(private http: HttpClient) { }

  // //GenerateRandom number for bid & ask
  // randomNumberGenerator(min: number, max: number) {
  //   let num = Math.random() * (max - min) + min;
  //   num = num * 100;
  //   let x = num % 10;
  //   num = num - x;
  //   if (x >= 5) {
  //     x = 5;
  //   }
  //   else {
  //     x = 0;
  //   }
  //   num = num + x;
  //   num = num / 100;
  //   return (+num.toFixed(2));
  // }

  randomQtyGenerator() {
    let buyArr: number[] = [];
    let sellArr: number[] = [];
    for (let i = 0; i < 5; i++) {
      // buyArr.push(this.quantityGenerator(1, 1000));
      buyArr.push(this.pdApi.buy[i].quantity)
      sellArr.push(this.pdApi.sell[i].quantity)
      // sellArr.push(this.quantityGenerator(1, 1000));
    }
    this.buyQtyArr.next(buyArr);
    this.sellQtyArr.next(sellArr);
  }

  // // Generate quantity
  // quantityGenerator(min: number, max: number) {
  //   return Math.floor(Math.random() * (max - min + 1) + min)
  // }

  generateData() {
    let bidArr: number[] = [];
    let askArr: number[] = [];
    //For Bid Array
    for (let i = 0; i < 5; i++) {
      // bidArr.push(this.randomNumberGenerator(lastPrice - this.diff, lastPrice));
      bidArr.push(this.pdApi.buy[i].price);
    }
    bidArr.sort();
    bidArr.reverse();
    this.randomBid.next(bidArr);

    //For Ask array
    for (let i = 0; i < 5; i++) {
      // askArr.push(this.randomNumberGenerator(lastPrice, lastPrice + this.diff));
      askArr.push(this.pdApi.sell[i].price);
    }
    askArr.sort();
    this.randomAsk.next(askArr);


  }
  show(){
    this.generateData();
    this.randomQtyGenerator();
  }

  showData(lP: any) {
    let lastPrice = lP;
    this.getPriceDepth(lastPrice).subscribe(result => {
      this.pdApi = result;
    });
    this.priceShare.next(lastPrice);
    // this.show()
    setTimeout(() =>
    this.show()
    ,500);
    
  }

  getData(data: any) {
    let apiData = data;
    let lastPrice = apiData.data[0].price;    
    this.showData(lastPrice);
    setInterval(() => {
      this.showData(lastPrice);
    }, 3000);
  }



  sendQty(): Observable<any>[] {
    return [this.buyQtyArr.asObservable(),
    this.sellQtyArr.asObservable(),
    this.randomBid.asObservable(),
    this.randomAsk.asObservable(),
    this.priceShare.asObservable()];
  }


  watchlistArr: any[] = [];
  createWatchlist(data: any) {
    if (this.watchlistArr.includes(data)) {
      alert("Already Added")
    } else {
      this.watchlistArr.push(data);
    }

  }
  passWatchlist() {
    return this.watchlistArr;
  }



  //Obserable 
  apiStore = new BehaviorSubject<any>([]);
  apiDataReceived = new BehaviorSubject<boolean>(false)
  getStatus() {
    return this.apiDataReceived.asObservable();

  }
  setApiData(data: any) {
    this.apiCall(data);
  }
  getApiData(): Observable<any> {
    return this.apiStore.asObservable();
  }
  apiCall(symbol: any) {
    let token = "M7FUkY904hxEswqNZjJJ3WECnXOhxpKgKHcPnaJm";
    let url = `https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${token}`;
    this.http.get(url).subscribe(res => {
      this.apiStore.next(res)
      this.getData(res)
      this.apiDataReceived.next(true)
    });
  }

  getPriceDepth(ltp: any) {
    let passData = {
      price: ltp,
    };
    return this.http.post(`${baseUrl}depth/`, passData);

  }
}


/*
API TOKENS
M7FUkY904hxEswqNZjJJ3WECnXOhxpKgKHcPnaJm
IQTraJKtUIR2yYaO7QP4vf4UKgeeX9RWwp9PaAIE
yPRMSfinqUtlGkSnAl1qzDb5fD9rMkeIoHvJwxcM
KMQHk2c0F25mW6h3A5KX9fCxsiyvD9eDiduLMWsB
*/