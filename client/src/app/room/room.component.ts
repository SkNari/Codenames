import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public roomName : any;
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.roomName = this.route.snapshot.paramMap.get('roomName');
  }

}
