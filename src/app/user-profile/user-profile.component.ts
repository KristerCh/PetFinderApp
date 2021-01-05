import { Entity } from './../Models/Entity';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  entityProfile: FormGroup;
  subscription: Subscription;
  profile: Entity;
  idProfile = 0;

  constructor() { }

  ngOnInit() {
  }

}
