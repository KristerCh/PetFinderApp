import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from 'app/Models/Report';
import { ReportsService } from 'app/Services/reports.service';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

  reportDetail: FormGroup;
  report: Report;

  constructor(public dialog: MatDialog,
    private reportService: ReportsService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.getReportbyId();

  }

  closer() {
    this.dialog.closeAll();
  }

  getReportbyId() {
    this.reportService.getReportId(this.data)
      .subscribe(
        response => {
          this.report = response;
        }
      )
  }

}
