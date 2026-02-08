import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  matchURL: string = "http://localhost:3000/matches";
  constructor(private httpClient: HttpClient) { }

  getAllMatches() { 

      return this.httpClient.get<{ matches: any }>(this.matchURL)


  }


  getMatcheById(id :any) {
    return this.httpClient.get<{ matche: any , msg : string }>(this.matchURL + "/" + id);
   }

     deleteMatcheBYId(id : any) {

      return this.httpClient.delete<{msg : string , isDeleted : boolean}  >(this.matchURL + "/" + id );

      }

  addMatch(obj:any) {

      return this.httpClient.post<{msg : string}>(this.matchURL,obj);

   }


  editMatch(obj:any) { 
    return this.httpClient.put<{msg : string , isUpdate : boolean}>(this.matchURL,obj);
  }
 
searchMatch(obj: any) {
  return this.httpClient.post<{ matches?: any[], msg?: string }>(this.matchURL + '/search',
    obj
  );
}

}
