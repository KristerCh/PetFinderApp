import { environment } from './../../environments/environment';
import { Entity } from './../Models/Entity';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  controllerUrl = "entity";
  apiUrl = environment.urlApp;

  

  constructor(private http: HttpClient) { }

  saveEntity(entity: Entity){
    return this.http.post<Entity>(this.apiUrl + this.controllerUrl, entity);
  }

  getEntity(id: number){
    return this.http.get<Entity>(this.apiUrl + this.controllerUrl + "/" + id);
  }

  getByAuth(auth0Id: string){
    return this.http.get<Entity>(this.apiUrl + this.controllerUrl + "/getbyauth/" + auth0Id);
  }

  editEntity(id: number, entity: Entity){
    return this.http.put<Entity>(this.apiUrl + this.controllerUrl + "/" + id, entity);
  }

  deletEntity(id: number){
    return this.http.delete<Entity>(this.apiUrl + this.controllerUrl + "/" + id);
  }

}
