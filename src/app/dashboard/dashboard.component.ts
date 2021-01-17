import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService) { }
  
 ngOnInit(){}

}
