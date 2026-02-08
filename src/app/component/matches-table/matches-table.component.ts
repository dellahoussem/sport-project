import { Component } from '@angular/core';

import { NgFor } from '@angular/common';
import { Route, Router } from '@angular/router';
import { NgStyle, NgClass } from '@angular/common';
import { deleteObject, getFromLS } from '../../shared/genericFunction';
import { FormsModule, NgModel } from '@angular/forms';
import { MyFilterPipe } from '../../pipes/my-filter.pipe';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches-table',
  imports: [NgFor, NgClass, NgStyle, FormsModule, MyFilterPipe],
  templateUrl: './matches-table.component.html',
  styleUrl: './matches-table.component.css'
})
export class MatchesTableComponent {
  matchesTab: any = [];
  search !: string;
  constructor(private router: Router,
    private mService: MatchService) { }
  ngOnInit() {
    this.mService.getAllMatches().subscribe(
      (expressResponse) => {
        console.log("here is tab d objet  recuperee de la collection matches", expressResponse)
        this.matchesTab = expressResponse.matches;
      }
    );

  }


  goToInfo(matchId: any) {

    // alert("info cliked")
    this.router.navigate(["matcheInfo/" + matchId])

  }
  goToEdit(matchId: any) {
    this.router.navigate(["editMatche/" + matchId])
  }

  discriptionMatch(elt: any) {
    if (elt.scoreOne > elt.scoreTow) {
      return elt.teamOne + ' is the winer'
    }
    else if
      (elt.scoreOne < elt.scoreTow) {
      return elt.teamOne + ' is the loser'
    }
    else {
      return 'matche between team' + elt.teamOne + ' &' + elt.teamTow + ' is draw'
    }
  }

  delete(matchId: number) {
    this.mService.deleteMatcheBYId(matchId).subscribe(
      (deleteResponse) => {
        console.log("here is response after delete  matches", deleteResponse);
        if (deleteResponse.isDeleted) {
          this.mService.getAllMatches().subscribe(
            (expressResponse) => {
              this.matchesTab = expressResponse.matches;
            }
          );
        }
      }
    );


  }

}
