import { Component } from '@angular/core';
import { MatchesTableComponent } from '../matches-table/matches-table.component';
import { TeamsTableComponent } from '../teams-table/teams-table.component';
import { PlayersTableComponent } from '../players-table/players-table.component';
import { DatePipe } from '@angular/common';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { VoyellesPipe } from '../../pipes/voyelles.pipe';

@Component({
  selector: 'app-admin',
  imports: [MatchesTableComponent,TeamsTableComponent,PlayersTableComponent,DatePipe,ReversePipe,VoyellesPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
titel : string = 'Dashboard Admin'
test : string = 'Dashboard Admin'
actualDate: any =new Date();


}
