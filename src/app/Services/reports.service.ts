import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Report } from 'app/Models/Report';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  UrlController = "report";
  apiUrl = environment.urlApp;
  private nameCollection = 'reports';

  constructor(
    private storage: AngularFireStorage,
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

    imageUploadTask(fileName: string, data: any){
      return this.storage.upload(fileName, data);
    }

    imageUploadReference(fileName: string) {
      return this.storage.ref(fileName);
    }

}
