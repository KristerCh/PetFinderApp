import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '@auth0/auth0-angular';
import { MapsComponent } from 'app/maps/maps.component';
import { Report } from 'app/Models/Report';
import { ReportsService } from 'app/Services/reports.service';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reports: Report[];

  filterReport = '';

  private unsubscribe: Subject<void>;
  pages: number = 1;

  petsAvatar = environment.petsAvatar;

  constructor(
    public auth: AuthService,
    private reportService: ReportsService,
    public dialog: MatDialog
    ) { 
      this.unsubscribe = new Subject();
    }
  
 ngOnInit(){
   this.getReports();
 }

 viewDetailReport(id: any){
  const confiDialog = new MatDialogConfig();
  confiDialog.data = id
  this.dialog.open(MapsComponent, confiDialog);
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

}
