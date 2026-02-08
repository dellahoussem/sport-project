import { Component } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { ActivatedRoute } from '@angular/router';
import { getFromLS } from '../../shared/genericFunction';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-match-info',
  imports: [ResultComponent],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.css'
})
export class MatchInfoComponent {
  matchesTab: any = [

  ];


  constructor(private activatedRoute: ActivatedRoute,
    private mService: MatchService
  ) { }

  foundMatch: any;
 
  matcheId!: string;
  //foundMatch : any


  ngOnInit() {

    this.matcheId = this.activatedRoute.snapshot.params["id"]
    this.mService.getMatcheById(this.matcheId).subscribe(
      (res) => {
        
        this.foundMatch = res.matche;

      }
    );

  }

}
