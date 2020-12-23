import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { RoomService } from '../service/room.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public client : ClientService) {

  }

  ngOnInit(): void {
  }

  createRoom(){
    this.client.createRoom();
  }

  askRooms(){
    this.client.askForRooms();
  }

}
