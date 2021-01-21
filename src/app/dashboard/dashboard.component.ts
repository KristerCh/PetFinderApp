import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Report } from 'app/Models/Report';
import { ReportsService } from 'app/Services/reports.service';
import * as Chartist from 'chartist';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reports: Report[];

  private unsubscribe: Subject<void>;
  pages: number = 1;

  constructor(
    public auth: AuthService,
    private reportService: ReportsService
    ) { 
      this.unsubscribe = new Subject();
    }
  
 ngOnInit(){
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

}
