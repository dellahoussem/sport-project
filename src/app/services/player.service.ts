import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
playerURL: string = "http://localhost:3000/players";
  constructor(private httpClient: HttpClient) { }

getAllPlayers() { 

      return this.httpClient.get<{ players: any }>(this.playerURL)


  }


  getPlayerById(id :any) {
    return this.httpClient.get(this.playerURL + "/" + id);
   }

     deletePlayerBYId(id : any) {

      return this.httpClient.delete(this.playerURL + "/" + id );

      }

  addPlayer(obj:any) {

      return this.httpClient.post<{msg : string}>(this.playerURL,obj);

   }


  editPlayer(obj:any) { 
    return this.httpClient.put(this.playerURL,obj);
  }
 




}
