import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { editObject, getFromLS } from '../../shared/genericFunction';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { response } from 'express';

@Component({
  selector: 'app-edit-matche',
  imports: [FormsModule],
  templateUrl: './edit-matche.component.html',
  styleUrl: './edit-matche.component.css'
})
export class EditMatcheComponent {
 matchesTab:any=[]

obj:any={};
constructor(private activatedRoute:ActivatedRoute,
            private router : Router,
            private mService: MatchService
){}
matcheId!: string;
 //foundMatch : any

 
ngOnInit(){

this.matcheId = this.activatedRoute.snapshot.params["id"]
 this.mService.getMatcheById(this.matcheId).subscribe(
  (res) => {
        console.log("here is  objet  recuperee de la collection matches", res)
        this.obj = res.matche;
        
      }
 );

}
editMatch(){


 this.mService.editMatch(this.obj).subscribe(
  (res)=>{
    console.log("here is  responce after edited", res);
    if (res.isUpdate) {
      this.router.navigate(['admin']);
    }
  }
 );


}
}
