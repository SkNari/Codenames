import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {io} from 'socket.io-client';
import { RoomService } from './room.service';

//import { CookieService } from "angular2-cookie/core";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private socket : any;
  public rooms : any;
  public currentRoom : any;
  constructor(private roomService : RoomService,private router : Router){

    this.socket = io("http://localhost:8000",{query: 'key='+localStorage.getItem("key")});
    this.socket.on('connection', text => {

      console.log(text);

    })
    this.socket.on("sendRooms", rooms => {

      console.log(rooms);
      this.rooms = rooms

    })

    this.socket.on("roomJoined", room =>{
      
      if(!room){
        this.router.navigate(["/"]);
      }
      this.currentRoom = room;

    })

    this.socket.on("roomCreated", room => {

      this.router.navigate([room.name]);

    })

    this.socket.on("newKey", key => {

      localStorage.setItem("key",key);

    })

    this.socket.on("roomUpdate", room => {
      this.currentRoom = room;
      console.log(room);
    })

    this.socket.on("disconnect", () => {

      this.currentRoom = null;
      this.rooms = null;
      this.router.navigate(["/"]);

    })

    this.socket.on("chatUpdate", chat => {

      this.currentRoom.chat = chat;

    })
   }

   createRoom(){
     this.socket.emit('createRoom');
   }

   askForRooms(){
     this.socket.emit('askForRooms');
   }

   joinRoom(roomName : string){
      this.socket.emit('joinRoom', roomName);
   }

   sendMessage(message : string){
      this.socket.emit("chat",message);
   }

   leaveRoom(){
     this.socket.emit("leaveRoom");
   }
}

