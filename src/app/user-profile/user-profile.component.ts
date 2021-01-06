
import { EntityService } from './../Services/entity.service';
import { Entity } from './../Models/Entity';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder,
    private profileSevice: EntityService) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      identification: ['', Validators.required],
      userName: ['', Validators.required, Validators.pattern("[A-Za-z]")],
      name: ['', Validators.pattern("[A-Za-z]")],
      lastName: ['', Validators.pattern("[A-Za-z]")],
      phoneNumber: ['',Validators.required, Validators.pattern("[0-9]")],
      email: ['', Validators.required, Validators.email],
      address: ['', Validators.required],
      photo: ['', Validators.required],
      whatsapp: true
    })
    if(!this.createMode){
      this.loadForm(this.profile);
    }
  }

  loadForm(values){
    this.profileForm.patchValue(values);
  }

  saveProfile(){
    if(this.profileForm.invalid){
      return
    }

    if(this.createMode){
      let profilEntity: Entity = this.profileForm.value; 
      this.profileSevice.saveEntity(profilEntity).subscribe(data => {
        $.notify({icon: "notifications", message: "Registered Profile!"});
      })
    }else{
      let profilEntity: Entity = this.profileForm.value;
      profilEntity.idEntity = this.profile.idEntity;
      this.profileSevice.editEntity(profilEntity.idEntity, profilEntity).subscribe(data => {
        $.notify({icon: "notifications", message: "Updated Profile!"})
      })
    }
  }

}
