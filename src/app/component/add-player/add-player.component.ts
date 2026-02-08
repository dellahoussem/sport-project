import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateId, getFromLS } from '../../shared/genericFunction';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-add-player',
  imports: [FormsModule, NgFor],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {
  obj: any = {};
  teams: any = []
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private pServive:PlayerService,
              private tService:TeamService
  ) { }
  addPlayer() {
    console.log("here is player object", this.obj);
    
    this.pServive.addPlayer(this.obj).subscribe(
      (expressResponse) => {
        console.log("here is response from Express after adding team",expressResponse);
      }
    );

    this.router.navigate(['admin']);
  }

  ngOnInit() {

    this.tService.getAllTeams().subscribe(
      (data) => {
        this.teams=data.teams;
      }
    );
  }
}
