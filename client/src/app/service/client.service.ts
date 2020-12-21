import { Injectable } from '@angular/core';
import {io} from 'socket.io-client';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private socket : any;
  constructor(private roomService : RoomService){

    this.socket = io("http://localhost:8000");
    this.socket.on('connection', text => {

      console.log(text);

    })
    this.socket.on("sendRooms", rooms => {

      this.roomService.setRooms(rooms);
      console.log(this.roomService.getRooms());

    })
   }

   createRoom(){
     this.socket.emit('createRoom');
   }

   askForRooms(){
     this.socket.emit('askForRooms');
   }

}

