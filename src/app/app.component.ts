import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

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
export class AppComponent implements AfterViewInit {
  // @ViewChild('agGrid')
  // public agGrid: AgGridAngular;
  columnDefs: ColDef[] = [
    { field: 'athlete', headerName: 'Name', minWidth: 150 },
    { field: 'age', maxWidth: 90 },
  ];
  readonly rowData = new BehaviorSubject<IAthlete[]>([]);

  constructor(private http: HttpClient) {
    //    const client = new HttpClient()
  }

  async loadGridData() {
    const data = await firstValueFrom(
      this.http.get<IAthlete[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
    );
    console.log(data[2]);
    this.rowData.next(data);
    // this.agGrid.api.hideOverlay();
  }

  public ngAfterViewInit(): void {
    //    this.agGrid.api.showLoadingOverlay();
    // this.agGrid.firstDataRendered.subscribe(() => {
    //   this.firstDataRendered.bind(this);
    // });
    // this.subscribe(this.agGrid.firstDataRendered, this.firstDataRendered.bind(this))
    // this.loadGridData();
  }

  public async mappingsGridOnReady(event) {
    console.log('Mappings grid ready...');
    const gridApi = event.api;
    const data = await firstValueFrom(
      this.http.get<IAthlete[]>(
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      )
    );
    gridApi.setRowData(data ?? []);
  }

  private firstDataRendered(): void {
    // this.agGrid.columnApi.autoSizeAllColumns();
  }
}
