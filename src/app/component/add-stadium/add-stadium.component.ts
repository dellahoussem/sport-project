import { NgIf, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StadiumServiceService } from '../../services/stadium-service.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-stadium',
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './add-stadium.component.html',
  styleUrl: './add-stadium.component.css'
})
export class AddStadiumComponent {
 constructor(private activatedRoute: ActivatedRoute,
     private router: Router,
     private sService: StadiumServiceService,
     private teamService  : TeamService
    ) { }
   obj: any = {};
   teams : any =[];
ngOnInit(){
  this.teamService.getAllTeams().subscribe(
    (data)=>{
      this.teams=data.teams;
    }
  )
}
addStadium(){
console.log("here is STADIUM object", this.obj);
    this.sService.addStadium(this.obj).subscribe(
      (expressResponse) => {
        console.log("here is response from Express after adding stadium",expressResponse);
      }
    )
    this.router.navigate(['admin']);
}


}
