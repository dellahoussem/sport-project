import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { deleteObject, getFromLS } from '../../shared/genericFunction';
import { Route, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-players-table',
  imports: [NgFor],
  templateUrl: './players-table.component.html',
  styleUrl: './players-table.component.css'
})
export class PlayersTableComponent {
  constructor(private router:Router,
              private pService:PlayerService
  ){}
playersTab:any=[
  
];
 team:any;

ngOnInit(){
  this.pService.getAllPlayers().subscribe(
    (expressResponse) => {
        console.log("here is players tab from expresse", expressResponse)
        this.playersTab = expressResponse.players;
      }
  );

  
}
goToInfo(playerId:any){

 // alert("info cliked")
 this.router.navigate(["playerInfo/"+playerId])
 
}
goToEdit(playerId : any){
  this.router.navigate(["editPlayer/"+playerId])
}
delete(playerId:number){
  this.pService.deletePlayerBYId(playerId).subscribe();
  

}

findTeam(idTeam:any){
  let teams = getFromLS("teams");
 return  teams.find((elt : any) => elt.id == idTeam);
 

}
}
