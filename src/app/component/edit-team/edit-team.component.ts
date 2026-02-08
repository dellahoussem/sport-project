import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { editObject, getFromLS } from '../../shared/genericFunction';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-edit-team',
  imports: [FormsModule],
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css'
})
export class EditTeamComponent {
  obj: any = {}
   teamTab:any=[]
   teamId!: number;
  constructor(private activatedRoute:ActivatedRoute,
              private router : Router,
              private tService : TeamService
            ){}
  ngOnInit() {

this.teamId = this.activatedRoute.snapshot.params["id"]
 this.tService.getTeamById(this.teamId).subscribe();

  }

  editTeam() {

    this.tService.editTeam(this.obj).subscribe();
    this.router.navigate(['admin']);
  }
}
