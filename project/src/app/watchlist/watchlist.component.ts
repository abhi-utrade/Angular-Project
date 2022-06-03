import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../services/auth.service';
import { SymbolService } from '../services/symbol.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {


  watchListArray: any[] =  []; //this.service.passWatchlist();

  constructor(private service:SymbolService, private auth:AuthService) {
    this.showWatchList();
   }

   showWatchList(){
     this.watchListArray = [];
    this.auth.getWatchList().subscribe(res => {
      res.forEach((ele :any) => 
      this.watchListArray.push(ele.watchlist))
    });
   }
  
  ngOnInit(): void {
  }

  openWatchlistItem(item:any){
     this.service.setApiData(item);
  }

  deleteWatchlistItem(item:any){
    this.auth.deleteWatchList(item).subscribe(res => {
      this.showWatchList();
    })
  }

  

}
