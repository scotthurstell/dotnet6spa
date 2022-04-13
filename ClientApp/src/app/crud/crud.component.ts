import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html'
})
export class CrudComponent {
  public forecasts: WeatherForecast[] = [];
  baseUrl: string = "";
  //displayedColumns: string[] = ['date', 'temperatureC', 'temperatureF', 'summary'];

  constructor(private http: HttpClient, @Inject('BASE_URL') private url: string) {
    this.baseUrl = url;
    http.get<WeatherForecast[]>(url + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  deleteForecast(id: number) {
    return this.http.delete(this.baseUrl + 'weatherforecast/' + id).subscribe(response => {
      this.http.get<WeatherForecast[]>(this.url + 'weatherforecast').subscribe(result => {
        this.forecasts = result;
      }, error => console.error(error));
    });
  }
}

interface WeatherForecast {
  id: number;
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
