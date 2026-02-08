import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StadiumServiceService {
stadiumURL: string = "http://localhost:3000/stadiums";
  constructor(private httpClient: HttpClient ) { }
 
addStadium(obj:any){
 return this.httpClient.post<{ stadium: any }>(this.stadiumURL,obj);
}

}
