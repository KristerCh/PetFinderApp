import { AuthService } from '@auth0/auth0-angular';

import { EntityService } from './../Services/entity.service';
import { Entity } from './../Models/Entity';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  profile: Entity;
  // createMode: boolean = false;
  // idProfile: any;

  unsubscribeAll: Subject<void>;


  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private profileSevice: EntityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.profileForm = this.formBuilder.group({
      identification: ['', Validators.required],
      auth0Id: [''],
      userName: [''],
      name: [''],
      lastName: [''],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      photo: [''],
      whatsapp: [true],
      facebook: ['']
    });
    this.profile = new Entity;
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.getLoggedUserInfo();
    this.greeting();

    // this.idProfile = this.route.snapshot.paramMap.get('id');

    // this.subscription = this.profileSevice.getEntity(this.idProfile).subscribe(data => {
    //   this.profile = data;
    // });

    // if (this.idProfile) {
    //   this.loadForm(this.profile);
    //    createMode = true;
    // }
    this.loadForm(this.profile);

  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getLoggedUserInfo() {
    this.auth.user$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        res => {
          console.log(res);
          let id = res.sub.split("|")[1];
          this.profile = res;
          this.profile.userName = res.nickname;
          this.profile.auth0Id = id;
          this.profile.name = res.given_name;
          this.profile.lastName = res.family_name;
          this.loadForm(this.profile);
        }
      );
  }

  loadForm(selectedProfile: Entity) {
    this.profileForm.patchValue(selectedProfile);
  }

  saveProfile() {
    console.log(this.profileForm.value);
    if (!this.profileForm.valid) {
      return;
    }

    let profilEntity: Entity = this.profileForm.value;
    this.profileSevice.saveEntity(profilEntity)
    .pipe(
      finalize(
        () => {
          this.router.navigate(["dashboard"]);
        }
      ),
      takeUntil(this.unsubscribeAll)
    )
    .subscribe(data => {
      $.notify({ icon: "notifications", message: "Registered Profile!" });
    })

  }

  deleteProfile(id: number) {
    if (confirm("Do you want delete this profile permanently?")) {
      this.profileSevice.deletEntity(id).subscribe(data => {
        $.notify({ icon: "notifications", message: "Permanently deleted Profile!" });
        this.profileForm.reset();
      });
    }
  }

  greeting(){
    $.notify({ icon: "account_circle", message: "Welcome! Please complete your profile information."});
  }

}
