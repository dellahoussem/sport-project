import { Component } from '@angular/core';
import { PlayerComponent } from "../player/player.component";
import { getFromLS } from '../../shared/genericFunction';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-info',
  imports: [PlayerComponent],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.css'
})
export class PlayerInfoComponent {
  constructor(private activatedRoute:ActivatedRoute,
              private pService : PlayerService
  ){}
playerTab:any=[
  
];
foundPlayer:any;
ngOnInit(){


    let playerId = this.activatedRoute.snapshot.params["id"]
   this.pService.getPlayerById(playerId).subscribe();
   
}
}
