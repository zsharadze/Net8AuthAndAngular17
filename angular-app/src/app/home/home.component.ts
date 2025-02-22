import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { Router } from '@angular/router';
import { WeatherModel } from '../models/weather.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  providers: [WeatherService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  weatherData: WeatherModel[] = [];
  constructor(
    private _weatherService: WeatherService,
    private router: Router
  ) {}

  ngOnInit() {
    this._weatherService.getWeather().subscribe((res: any) => {
      this.weatherData = res;
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
