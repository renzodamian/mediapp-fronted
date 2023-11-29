import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  standalone:true,
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
  imports:[MaterialModule, ReactiveFormsModule, RouterLink]
})
export class PatientEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
    ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dni: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('')
    });
    this.route.params.subscribe(data =>{
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }
  initForm(){
    if(this.isEdit){
      
      this.patientService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          idPatient: new FormControl(data.idPatient),
          firstName: new FormControl(data.firstName),
          lastName: new FormControl(data.lastName),
          dni: new FormControl(data.dni),
          address: new FormControl(data.address),
          phone: new FormControl(data.phone),
          email: new FormControl(data.email)
        });
      });      
    }
  }

  operate(){
    
  }

}
