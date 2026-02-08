import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
teamURL: string = "http://localhost:3000/teams";
  constructor(private httpClient: HttpClient) { }

getAllTeams() { 

      return this.httpClient.get<{ teams: any }>(this.teamURL)


  }


  getTeamById(id :any) {
    return this.httpClient.get(this.teamURL + "/" + id);
   }

     deleteTeamBYId(id : any) {

      return this.httpClient.delete(this.teamURL + "/" + id );

      }

  addTeam(obj:any) {

      return this.httpClient.post<{msg : string}>(this.teamURL,obj);

   }


  editTeam(obj:any) { 
    return this.httpClient.put(this.teamURL,obj);
  }
 





}
