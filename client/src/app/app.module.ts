import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ClientService } from './service/client.service';
import { RoomService } from './service/room.service';
import { RoomComponent } from './room/room.component';

import { CookieService } from 'ngx-cookie-service';
import { AskNameComponent } from './ask-name/ask-name.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RoomComponent,
    AskNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers:   [ClientService,RoomService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
