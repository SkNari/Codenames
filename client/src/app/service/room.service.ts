import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public rooms : any;
  constructor() {

    this.rooms = {}; 

   }

  
  setRooms(rooms){
    this.rooms = rooms;
  }

  getRooms(){
    return this.rooms;
  }
}
