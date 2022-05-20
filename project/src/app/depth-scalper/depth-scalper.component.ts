import { Component, OnInit } from '@angular/core';
import { SymbolService } from '..//symbol.service';

export interface ScalperElement {
  myVol: number;
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

  constructor(private sharedData:SymbolService) {
    this.lastPrice = (Math.ceil((this.sharedData.sendData())*20)/20);
    this.depthGenerator(this.lastPrice);
    this.showData();
   }

  depthGenerator(num:number){
    let num1 = num;
    for(let i = 0; i < 10; i++){
        num +=  0.05;
        this.ltpDepth.push((Math.round(num * 100)/100));
    }
    this.ltpDepth.reverse();
    this.ltpDepth.push(num1)
    for(let i = 0; i < 10; i++){
      num1 -=  0.05;
      this.ltpDepth.push((Math.round(num1 * 100)/100));
  }
  }

  showData(){
    for(let i = 0; i < 20; i++){
      this.ELEMENT_DATA.push({
        myVol: 0,
        bid: 0,
        price: this.ltpDepth[i],  
        ask: 0
      });
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
    
    
  }

}
