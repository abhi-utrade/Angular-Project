import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SymbolService } from '../services/symbol.service';

//Initialised Table colums using interface
export interface PDElement {
  buyQty: number;
  buyOrder: number;
  bid: number;
  ask: number;
  sellOrder: number;
  sellQty: number;

}


@Component({
  selector: 'app-price-depth',
  templateUrl: './price-depth.component.html',
  styleUrls: ['./price-depth.component.css']
})

export class PriceDepthComponent implements OnInit {

  ELEMENT_DATA: PDElement[] = [];
  randomBid: any[] = [];
  randomAsk: any[] = [];
  buyQtyArr: number[] = [];
  sellQtyArr: number[] = [];
  lastPrice: any;
  oldPrice: any;

  //Display Column of Table
  displayedColumns: string[] = ['buyQty', 'buyOrder', 'bid', 'ask', 'sellOrder', 'sellQty'];

  constructor(private sharedData: SymbolService) {
    this.sharedData.getApiData().subscribe(api => {
      this.lastPrice = api.data[0].price;
    });
    this.fetchData();
    this.showData();
  }


  fetchData() {
    let allObsers: Observable<any>[] = this.sharedData.sendQty();
    allObsers[4].subscribe((data: any[]) => {
      this.oldPrice = data;
    });
  
      allObsers[0].subscribe((data: any[]) => {
        this.buyQtyArr = data;
      });
      allObsers[1].subscribe((data: any[]) => {
        this.sellQtyArr = data;
      });
      allObsers[2].subscribe((data: any[]) => {
        this.randomBid = data;
      });
      allObsers[3].subscribe((data: any[]) => {
        this.randomAsk = data;
        if (this.lastPrice == this.oldPrice) {
          this.showData();
        }
      });
      
      

      





  }


  //Present data to table
  showData() {
    this.ELEMENT_DATA = [];
    for (let i = 0; i < 5; i++) {
      this.ELEMENT_DATA.push({
        buyQty: this.buyQtyArr[i],
        buyOrder: 0,
        bid: this.randomBid[i].toFixed(2),
        ask: this.randomAsk[i].toFixed(2),
        sellOrder: 0,
        sellQty: this.sellQtyArr[i]
      });
    }

  }




  ngOnInit(): void {

    //   setInterval(() => {
    //     this.showData();
    // }, 1000);
  }

}
