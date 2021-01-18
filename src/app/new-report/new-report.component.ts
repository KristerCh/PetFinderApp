import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report } from 'app/Models/Report';
import { Species } from 'app/Models/species.enum';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {

  species = Species;
  reportForm: FormGroup;
  report: Report;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.reportForm = this.formBuilder.group({
      idEntity: ['', Validators.required],
      status: [''],
      rescueDate: [''],
      idPet: [''],
      namePet: [''],
      specie: [''],
      race: [''],
      descrption: [''],
      age: [''],
      size: ['']
    });
  }

  ngOnInit(): void {
    
  }

  sendReport(){
    this.report.idEntity = this.reportForm.controls.idEntity.value;


    
  }

}
