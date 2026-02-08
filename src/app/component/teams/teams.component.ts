import { Component } from '@angular/core';
import { TeamComponent } from "../team/team.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-teams',
  imports: [TeamComponent,NgFor],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
teamsTab:any=[
  {id:1,name:"real",owner:"perez",fondation:"ESP"},
  {id:2,name:"bacelone",owner:"lapotra",fondation:"ESP"},
{id:3,name:"paris",owner:"nasser",fondation:"FR"},

];
}
