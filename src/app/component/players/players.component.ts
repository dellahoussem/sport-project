import { Component } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-players',
  imports: [PlayerComponent,NgFor],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
playersTab:any=[
  {id:1,name:"Messi",position:"ATK",nbr:10,age:39},
   {id:2,name:"C.Ronaldo",position:"ATK",nbr:7,age:40},
   {id:3,name:"salah",position:"ATK",nbr:11,age:35}
];
}
