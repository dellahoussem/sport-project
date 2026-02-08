import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { deleteObject, getFromLS } from '../../shared/genericFunction';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teams-table',
  imports: [NgFor],
  templateUrl: './teams-table.component.html',
  styleUrl: './teams-table.component.css'
})
export class TeamsTableComponent {
teamsTab:any=[
  
];
constructor(private router:Router,private tService : TeamService){}
ngOnInit(){
  this.tService.getAllTeams().subscribe(
    (expressResponse) => {
        console.log("here is teams tab from expresse", expressResponse)
        this.teamsTab = expressResponse.teams;
      }
  );

}


goToInfo(teamId:any){

 // alert("info cliked")
 this.router.navigate(["teamInfo/"+teamId])
}
goToEdit(teamId : any){
  this.router.navigate(["editTeam/"+teamId])
}

delete(matchId:number){
  this.tService.deleteTeamBYId(matchId);

}
findPlayers(idPlayer:any){

  let players=getFromLS("players");
  return players.find((elt : any) => elt.id==idPlayer);
  

}
}
