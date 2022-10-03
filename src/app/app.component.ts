import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface IAthlete {
  age: number;
  athlete: string;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  columnDefs = [
    { field: 'athlete', headerName: 'Name', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
  ];

  constructor(private http: HttpClient) {}

  public async mappingsGridOnReady(event) {
    const data = await firstValueFrom(
      this.http.get<IAthlete[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
    );
    event.api.setRowData(data ?? []);
  }
}
