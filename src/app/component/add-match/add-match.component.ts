import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateId } from '../../shared/genericFunction';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../../services/match.service';
@Component({
  selector: 'app-add-match',
  imports: [FormsModule],
  templateUrl: './add-match.component.html',
  styleUrl: './add-match.component.css'
})
export class AddMatchComponent {
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private mService: MatchService) { }
  obj: any = {};

  addMatch() {
    console.log("here is matche object", this.obj);
    this.mService.addMatch(this.obj).subscribe(
      (expressResponse) => {
        console.log("here is response from Express after adding match",expressResponse);
      }
    );
    this.router.navigate(['admin']);
  }

}
