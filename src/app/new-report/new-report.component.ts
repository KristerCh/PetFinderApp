import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Entity } from 'app/Models/Entity';
import { Report } from 'app/Models/Report';
import { Species } from 'app/Models/species.enum';
import { EntityService } from 'app/Services/entity.service';
import { ReportsService} from 'app/Services/reports.service'
import { pipe, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {

  species = Species;
  reportForm: FormGroup;
  report: Report;
  unsubscribe: Subject<void>;
  loggedUser: Entity;
  idUser: string;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private entityService: EntityService,
    private reportService: ReportsService,
    private router: Router
  ) { 
    this.reportForm = this.formBuilder.group({
      idEntity: [''],
      status: ['Lost'],
      rescueDate: [new Date()],
      namePet: [''],
      specie: [''],
      race: [''],
      description: [''],
      age: [''],
      size: ['']
    });
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.FindUserbyId();
  }

  FindUserbyId(){
    this.auth.user$
    .subscribe(
      res => {
        this.idUser = res.sub.split("|")[1];
        this.entityService.getByAuth(this.idUser).subscribe(
          info => {
            this.loggedUser = info;

            this.reportForm.patchValue({
              idEntity: this.loggedUser.idEntity
            });
          }
        );
      }
    );
  }


  savingReport(){
    this.report = this.reportForm.value;

    if(!this.reportForm.valid){
      return;
    }

    this.reportService.saveReport(this.report)
    .pipe(
      takeUntil(this.unsubscribe),
      finalize( () => {
        this.router.navigate(['/dashboard'])
      })
    )
    .subscribe(
      res => {
        $.notify({ icon: "notification", message: "Report Created Successfull!"})
        this.reportForm.reset();
        
      }
    )

    console.log(this.report);

  }

  test(){
    const reporting: Report = {
      // entity: {
      //   idEntity: this.loggedUser.idEntity,
      //   userName: this.loggedUser.userName,
      //   identification: this.loggedUser.identification,
      //   phoneNumber: this.loggedUser.phoneNumber,
      //   email: this.loggedUser.email,
      //   address: this.loggedUser.address,
      //   photo: this.loggedUser.photo
      // },
      idEntity: this.loggedUser.idEntity,
      status: this.reportForm.get('status').value,
      rescueDate: this.reportForm.get('rescueDate').value,
      idPet: 0,
      Pet : { 
        age: this.reportForm.get('age').value,
        namePet: this.reportForm.get('namePet').value,
        specie: this.reportForm.get('specie').value,
        description: this.reportForm.get('description').value,
        size: this.reportForm.get('size').value,
        race: this.reportForm.get('race').value        
      }
       
    }
    console.warn(this.reportForm.value);
    console.log(reporting);

  }


}
