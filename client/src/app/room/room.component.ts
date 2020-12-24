import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public roomName : any;
  constructor(private route : ActivatedRoute,public client : ClientService, private router : Router) { }

  ngOnInit(): void {
    this.roomName = this.route.snapshot.paramMap.get('roomName');
    this.client.joinRoom(this.roomName);
  }

  sendMessage(text : string){
    this.client.sendMessage(text);
  }

  leaveRoom(){
    this.client.leaveRoom();
    this.router.navigate(["/"]);
  }


}
