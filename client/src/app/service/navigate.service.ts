import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  public previousUrl;
  constructor(private router: Router) {
  }

  navigate(commands : any[],previousUrl : string){
    this.previousUrl = previousUrl;
    this.router.navigate(commands);
  }

  navigateBack(){
    var prev = this.previousUrl;
    delete this.previousUrl;
    if(this.previousUrl){
      this.router.navigate([prev]); 
    }
  }
}


