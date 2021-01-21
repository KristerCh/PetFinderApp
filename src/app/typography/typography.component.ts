import { Component, OnInit } from '@angular/core';
import { Report } from 'app/Models/Report';
import { ReportsService } from 'app/Services/reports.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  reports: Report[];
  view: number = 1;
  private unsubscribe: Subject<void>;

  constructor(private reportService: ReportsService) {
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
            return report.status != "Lost";
          })
        }
      )
  }

}
