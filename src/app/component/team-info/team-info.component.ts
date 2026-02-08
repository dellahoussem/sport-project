import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TeamComponent } from '../team/team.component';
import { getFromLS } from '../../shared/genericFunction';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-team-info',
  imports: [TeamComponent],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.css'
})
export class TeamInfoComponent {
teamsTab:any=[
  
];

constructor(private activatedRoute:ActivatedRoute,private tService : TeamService){}

 foundTeam : any
ngOnInit(){


    let teamId = this.activatedRoute.snapshot.params["id"]
    this.tService.getTeamById(teamId).subscribe();
}

}
