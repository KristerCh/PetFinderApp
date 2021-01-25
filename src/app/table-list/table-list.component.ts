import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapsComponent } from 'app/maps/maps.component';
import { Report } from 'app/Models/Report';
import { ReportsService } from 'app/Services/reports.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  reports: Report[];

  private unsubscribe: Subject<void>;
  actual: number = 1;

  constructor(private reportService: ReportsService,
    public dialog: MatDialog) { 
    this.unsubscribe = new Subject();
  }

  ngOnInit() {
    this.getReports();
  }

  getReports(){
    this.reportService.getReports()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        res => {
          this.reports = res;
          console.log(this.reports)
        }
      )
  }

  viewDetailReport(id: any){
    const confiDialog = new MatDialogConfig();
    confiDialog.data = id
    this.dialog.open(MapsComponent, confiDialog);
   }

}
