import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { CookieService } from 'ngx-cookie-service';
import {io} from 'socket.io-client';
import { NavigateService } from './navigate.service';
import { RoomService } from './room.service';

//import { CookieService } from "angular2-cookie/core";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private socket : any;
  public rooms : any;
  public currentRoom : any;
  public userName;
  private userKey;

  constructor(private roomService : RoomService,private router : Router,private cookieService : CookieService,private navigateService : NavigateService){

    this.userName = this.cookieService.check("name")?this.cookieService.get("name"):null;
    this.userKey = this.cookieService.check("key")?this.cookieService.get("key"):"";

    this.socket = io("http://localhost:8000",{query: {
      key : this.userKey,
      name : this.userName
    }});
    this.socket.on('connection', text => {

      console.log(text);

    })
    this.socket.on("sendRooms", rooms => {

      this.rooms = rooms

    })

    this.socket.on("newKey", key => {

      this.cookieService.set("key",key);

    })

    this.socket.on("roomUpdate", room => {
      this.currentRoom = room;
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
     this.socket.emit('createRoom', {} ,(key) => {
      this.router.navigate(["room/"+key]);
     });
   }

   askForRooms(){
     this.socket.emit('askForRooms', {} , (rooms) => {
        
        this.rooms = rooms;

     })
   }

   joinRoom(roomName : string){
      this.socket.emit('joinRoom', roomName, (room,error) => {

        if(error){
          this.router.navigate([""]);
        }else{
          this.currentRoom = room;
        }

      }); 
   }

   sendMessage(message : string){
      this.socket.emit("chat",message);
   }

   leaveRoom(){
     this.socket.emit("leaveRoom");
   }

   setUserName(name : string){

    this.cookieService.set("name",name);
    this.userName = name;

   }
}

