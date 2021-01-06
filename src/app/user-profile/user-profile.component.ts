
import { EntityService } from './../Services/entity.service';
import { Entity } from './../Models/Entity';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  subscription: Subscription;
  profile: Entity;
  createMode: boolean = false;
  idProfile: any;

  constructor(private formBuilder: FormBuilder,
    private profileSevice: EntityService, 
    private route: ActivatedRoute) { 
      this.profileForm = this.formBuilder.group({
        identification: ['', Validators.required],
        userName: ['', Validators.required, Validators.pattern("[A-Za-z]")],
        name: ['', Validators.pattern("[A-Za-z]")],
        lastName: ['', Validators.pattern("[A-Za-z]")],
        phoneNumber: ['',Validators.required, Validators.pattern("[0-9]")],
        email: ['', Validators.required, Validators.email],
        address: ['', Validators.required],
        photo: ['', Validators.required],
        whatsapp: [true],
        facebook: ['']
      })
    }

  ngOnInit() {
    this.idProfile = this.route.snapshot.paramMap.get('id');

    this.subscription = this.profileSevice.getEntity(this.idProfile).subscribe(data => {
      this.profile = data;
    });
    
    if(this.idProfile){
      this.loadForm(this.profile);
    }
  }

  loadForm(selectedProfile: Entity){
    this.profileForm.patchValue(selectedProfile);
  }

  saveProfile(){
    if(this.profileForm.invalid){
      return;
    }

    if(!this.idProfile){
      let profilEntity: Entity = this.profileForm.value; 
      this.profileSevice.saveEntity(profilEntity).subscribe(data => {
        $.notify({icon: "notifications", message: "Registered Profile!"});
      })
    }else{
      let profilEntity: Entity = this.profileForm.value;
      profilEntity.idEntity = this.profile.idEntity;
      this.profileSevice.editEntity(profilEntity.idEntity, profilEntity).subscribe(data => {
        $.notify({icon: "notifications", message: "Updated Profile!"});
      })
    }
  }

  deleteProfile(id: number){
    if(confirm("Do you want delete this profile permanently?")){
      this.profileSevice.deletEntity(id).subscribe(data => {
        $.notify({icon: "notifications", message: "Permanently deleted Profile!"});
        this.profileForm.reset();
      });
    }
  }

}
