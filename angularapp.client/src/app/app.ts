import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css'] // fixed typo
})
export class App implements OnInit {
  public forecasts: WeatherForecast[] = [];
  id = Math.random();

  constructor(private https: HttpClient, private cd: ChangeDetectorRef) {
    console.log(`App constructor ${this.id}`, this);
  }

  ngOnInit() {
    console.log('ngOnInit', this);
    this.getForecasts();
  }

  getForecasts() {
    this.https.get<any>('/weatherforecast').subscribe({
      next: (result) => {
        console.log("========== API Response ==========");
        console.log("API Result:", result);
        console.log("Result Length:", result.length);

        this.forecasts = result;

        // force change detection if the UI didn't update automatically
        this.cd.detectChanges();

        console.log("Forecasts after assignment:", this.forecasts);
        console.log("Forecasts Length:", this.forecasts.length);
        console.log("==================================");
      },
      error: (error) => {
        console.error("Failed to load forecasts:", error);
      }
    });
  }
  // babulal
  protected readonly title = signal('angularapp.client');
}
