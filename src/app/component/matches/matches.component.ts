import { Component } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { NgFor } from '@angular/common';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches',
  imports: [ResultComponent, NgFor],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  t: any = [];

  constructor(private mService: MatchService) { }
ngOnInit() {
    this.mService.getAllMatches().subscribe(
      (expressResponse) => {
        console.log("here is tab d objet  recuperee de la collection matches", expressResponse)
        this.t = expressResponse.matches;
      }
    );

  }

  updateMatches(tab:any){
    this.t = tab;
  }

}
