import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signal = false;
  user:any
  constructor(private http:HttpClient, private route:Router) { }
  signin(data:any):Observable<any>{
    this.user = data.username;
    return this.http.post(`${baseUrl}login/`,data);
  }
  signup(data:any):Observable<any>{
    return this.http.post(`${baseUrl}register/`,data);
  }

  // addWatchlist():Observable<any>{

  // }

  token:any; 
  getWatchList():Observable<any>{
    let header = new HttpHeaders().set(
      "Authorization", 'Bearer '+ this.token
    );
    return this.http.get(`${baseUrl}getlist/`,{headers:header})
  }

  addWatchList(item:any):Observable<any>{
    let data = {
      watchlist: item,
      user: this.user
    }
    return this.http.post(`${baseUrl}add/`,data)

  }

  deleteWatchList(item:any):Observable<any>{
    const options = {
      body: {
        watchlist: item,
        user: this.user
      }
    };
    return this.http.delete(`${baseUrl}delete/`,options)
  }

  openDashboard(){
    this.signal = true;
		this.route.navigate(['/dashboard']); 
	}
}
