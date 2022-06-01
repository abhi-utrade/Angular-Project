import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signal = false;
  constructor(private http:HttpClient, private route:Router) { }
  signin(data:any):Observable<any>{
    return this.http.post(`${baseUrl}login/`,data);
  }
  signup(data:any):Observable<any>{
    return this.http.post(`${baseUrl}register/`,data);
  }

  openDashboard(){
    this.signal = true;
		this.route.navigate(['/dashboard']); 
	}
}
