import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SymbolService } from '../services/symbol.service';

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
  displayedColumns: string[] = ['myVol', 'bid', 'price', 'ask'];
  ltpDepth: any[] = [];
  lastPrice: any;
  symbolName: any;

  randomBid: number[] = [];
  randomAsk: number[] = [];
  buyQtyArr: number[] = [];
  sellQtyArr: number[] = [];

  bidData: any;
  askData: any;


  constructor(private sharedData: SymbolService) {

    let lp;
    let sn;
    this.sharedData.getApiData().subscribe(api => {
      lp = (Math.ceil((api.data[0].price) * 20) / 20);
      sn = api.data[0].ticker;
    });
    this.lastPrice = lp;
    this.symbolName = sn;

    this.depthGenerator(this.lastPrice);
    this.fetchData();

  }

  fetchData() {

    let allObsers: Observable<any>[] = this.sharedData.sendQty();
    let check;

    allObsers[0].subscribe((data: any[]) => {
      this.buyQtyArr = data;
    });
    allObsers[1].subscribe((data: any[]) => {
      this.sellQtyArr = data;
    });
    allObsers[2].subscribe((data: any[]) => {
      this.randomBid = data;
      check = data;
    });
    allObsers[3].subscribe((data: any[]) => {
      this.randomAsk = data;
      this.showData();
    });

  }

  depthGenerator(num: number) {
    let num1 = num;
    for (let i = 0; i < 20; i++) {
      num += 0.05;
      this.ltpDepth.push((Math.round(num * 100) / 100));
    }
    this.ltpDepth.reverse();
    this.ltpDepth.push(num1)
    for (let i = 0; i < 20; i++) {
      num1 -= 0.05;
      this.ltpDepth.push((Math.round(num1 * 100) / 100));
    }
  }

  showData() {
    this.ELEMENT_DATA = [];
    //console.log(this.randomBid);
    for (let i = 0; i < 30; i++) {
      if (this.randomBid.includes(this.ltpDepth[i])) {
        let bidIdx = this.randomBid.findIndex(b => b === this.ltpDepth[i])
        this.bidData = this.buyQtyArr[bidIdx];
      }
      if (this.randomAsk.includes(this.ltpDepth[i])) {
        let askIdx = this.randomAsk.findIndex(b => b === this.ltpDepth[i])
        this.askData = this.sellQtyArr[askIdx];
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

  tableCeter() {
    let elmnt = document.getElementById(this.lastPrice);
    if (elmnt) {
      elmnt.scrollIntoView({ block: "center" });
      elmnt.style.background = "#bcf2f5";
    }


  }


  ngAfterViewChecked() {
    this.tableCeter();

  }

  ngOnInit(): void {
    //Interval
    //    setInterval(() => {
    //      this.showData();
    //  }, 2000);

  }

}
