import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapsComponent } from 'app/maps/maps.component';
import { Report } from 'app/Models/Report';
import { ReportsService } from 'app/Services/reports.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  reports: Report[];
  page: number = 1;
  private unsubscribe: Subject<void>;


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
          this.reports = this.reports.filter(report => {
            return report.status == "Lost";
          })
        }
      )
  }

  viewDetailReport(id: any){
    const confiDialog = new MatDialogConfig();
    confiDialog.data = id
    this.dialog.open(MapsComponent, confiDialog);
   }

}
