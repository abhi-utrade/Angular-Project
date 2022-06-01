import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.auth.signal){
        return true;
      }
      this.route.navigate(['/signin']); 
      return false;
  }
  
}
