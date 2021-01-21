import { AuthService } from '@auth0/auth0-angular';
import { EntityService } from './../Services/entity.service';
import { Entity } from './../Models/Entity';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { empty, Subject } from 'rxjs';
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

  userDB: Entity;
  unsubscribeAll: Subject<void>;


  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private profileService: EntityService,
    private router: Router,
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
    this.getLoggedUserId();
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

  getLoggedUserId(){
    let idUser;
    this.auth.user$
    .subscribe(
      res => {
        idUser = res.sub.split("|")[1];
        this.getUserFromDB(idUser);
      }
    );
  }

  getUserFromDB(id){
    this.profileService.getByAuth(id)
    .pipe(
      finalize(()=> {
        if(this.userDB == null){
          this.getLoggedUserInfo();
          $.notify({ icon: "account_circle", 
          message: "Welcome! Please complete your profile information."});
        }
      })
    )
    .subscribe(
      info => {
        this.userDB = info;
        this.profileForm.patchValue(this.userDB);
      }
    );
    
  }


  saveProfile() {
    console.log(this.profileForm.value);
    if (!this.profileForm.valid) {
      return ;
    }

    let profilEntity: Entity = this.profileForm.value;
    this.profileService.saveEntity(profilEntity)
    .pipe(
      finalize(
        () => {
          this.router.navigate(["dashboard"]);
        }
      ),
      takeUntil(this.unsubscribeAll)
    )
    .subscribe(
      data => {
      $.notify({ icon: "notifications", message: "Registered Profile!" });
      },
      error => {
        $.notify({ icon: "notifications", message: "Unsaved Profile!" });
      }
    )

  }

  deleteProfile(id: number) {
    if (confirm("Do you want delete this profile permanently?")) {
      this.profileService.deletEntity(id).subscribe(data => {
        $.notify({ icon: "notifications", message: "Permanently deleted Profile!" });
        this.profileForm.reset();
      });
    }
  }

}
