import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { NavigateService } from '../service/navigate.service';

@Component({
  selector: 'app-ask-name',
  templateUrl: './ask-name.component.html',
  styleUrls: ['./ask-name.component.css']
})
export class AskNameComponent implements OnInit {

  constructor(private clientService : ClientService,private router : Router,private navigateService : NavigateService) { }

  ngOnInit(): void {
  }

  changeName(text){
    this.clientService.setUserName(text);
    this.navigateService.previousUrl?this.navigateService.navigateBack():this.router.navigate(["/"]);
  }

}
