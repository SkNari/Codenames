import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from '../service/client.service';
import { NavigateService } from '../service/navigate.service';

@Injectable({
  providedIn: 'root'
})
export class AskNameGuard implements CanActivate {

  constructor(private navigateService: NavigateService,private clientService : ClientService,private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.clientService.userName){
        return true;
      }

      this.navigateService.navigate(["askName"],state.url);
      return false;
    }
  
}
