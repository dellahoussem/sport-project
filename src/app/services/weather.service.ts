import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

weatherUrl : string="http://localhost:3000/weather";

  constructor(private  httpClient : HttpClient) { }
searcheWeather(obj:any){
  return this.httpClient.post<{obj :any }>(this.weatherUrl,obj);
}

}
