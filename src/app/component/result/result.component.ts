import { NgStyle, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-result',
  imports: [NgStyle, NgClass, NgIf],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {

  constructor(private router: Router,
    private mService: MatchService) { }

  @Input() obj: any = {};
  @Output() matchesTosend : EventEmitter<any> = new EventEmitter();

 msg : string ="";
path! : string;

ngOnInit(){
  this.path = this.router.url;
}
  

  scoreColeur(a: number, b: number) {
    if (a > b) {
      return 'green'
    }
    else if
      (a < b) {
      return 'red'
    }
    else {
      return 'blue'
    }
  }

  scoreResult(a: number, b: number) {
    if (a > b) {
      return 'win'
    }
    else if
      (a < b) {
      return 'lost'
    }
    else {
      return 'draw'
    }
  }
  delete(id : number){

    this.mService.deleteMatcheBYId(id).subscribe(
      (deleteResponse) => {
        console.log("here is response after delete  matches", deleteResponse.isDeleted);
        if (deleteResponse.isDeleted) {
          this.mService.getAllMatches().subscribe(
            (expressResponse) => {
             console.log("matche deleted with succsess",expressResponse.matches);
              this.matchesTosend.emit(expressResponse.matches);
            }
          );
        }
      }
    );


  }
}
