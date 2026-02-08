import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { editObject, getFromLS } from '../../shared/genericFunction';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-edit-player',
  imports: [FormsModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.css'
})
export class EditPlayerComponent {
obj: any = {};
playerTab:any=[]
   playerId!: number;
   constructor(private activatedRoute:ActivatedRoute,
                private router : Router,
              private pService:PlayerService
              ){}
ngOnInit() {

this.playerId = this.activatedRoute.snapshot.params["id"]
 this.pService.getPlayerById(this.playerId).subscribe();

  }



  editPlayer(){
    this.pService.editPlayer(this.obj).subscribe();
    
    this.router.navigate(['admin']);
  }
}
