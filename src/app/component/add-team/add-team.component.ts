import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateId } from '../../shared/genericFunction';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-add-team',
  imports: [FormsModule],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {
  obj: any = {};
  constructor(private activatedRoute:ActivatedRoute,
    private router : Router,
    private tService : TeamService
  ){}
  addTeam() {
    console.log("here is team object", this.obj);
    this.tService.addTeam(this.obj).subscribe(
       (expressResponse) => {
        console.log("here is response from Express after adding team",expressResponse);
      }
    );
    this.router.navigate(['admin']);
  }
}
