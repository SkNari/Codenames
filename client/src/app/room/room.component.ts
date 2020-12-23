import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public roomName : any;
  constructor(private route : ActivatedRoute,public client : ClientService) { }

  ngOnInit(): void {
    this.roomName = this.route.snapshot.paramMap.get('roomName');
    this.client.joinRoom(this.roomName);
  }


}
