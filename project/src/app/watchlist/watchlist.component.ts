import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { SymbolService } from '../services/symbol.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {


  watchListArray: any[] = this.service.passWatchlist();

  constructor(private service:SymbolService) { }
  
  ngOnInit(): void {
  }

  openWatchlistItem(item:any){
    this.service.setApiData(item);
  }

  deleteWatchlistItem(item:any){
    const index = this.watchListArray.indexOf(5);
    this.watchListArray.splice(index, 1);
  }

  

}
