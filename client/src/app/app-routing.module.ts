import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [{
  path: '',
  component: HomepageComponent
},
{
  path: ':roomName',
  component: RoomComponent
},
{ path: '**',   redirectTo: '', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
