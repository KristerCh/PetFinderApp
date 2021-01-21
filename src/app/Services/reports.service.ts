import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from 'app/Models/Report';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  UrlController = "report";
  apiUrl = environment.urlApp;

  constructor(
    private http: HttpClient
  ) { }

    saveReport(reporting: Report){
      return this.http.post<Report>(this.apiUrl + this.UrlController, reporting);
    }

    getReportId(id: number){
      return this.http.get<Report>(this.apiUrl + this.UrlController + "/" + id);
    }

    getReports(){
      return this.http.get<Report[]>(this.apiUrl + this.UrlController);
    }

    editReport(id: number, reporting: Report){
      return this.http.put<Report>(this.apiUrl + this.UrlController + "/" + id, reporting);
    }

}
