import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AskNameComponent } from './ask-name/ask-name.component';
import { AskNameGuard } from './ask-name/ask-name.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [{
  path: '',
  component: HomepageComponent,
  canActivate: [AskNameGuard]
},
{
  path: 'room/:roomName',
  component: RoomComponent,
  canActivate: [AskNameGuard]
},
{ path: 'askName', component: AskNameComponent},
{ path: '**',   redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AskNameGuard]
})
export class AppRoutingModule { }
