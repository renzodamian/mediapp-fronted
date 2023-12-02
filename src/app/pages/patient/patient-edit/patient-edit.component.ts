import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  standalone:true,
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
  imports:[MaterialModule, ReactiveFormsModule, RouterLink, NgIf]
})
export class PatientEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email])
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
          firstName: new FormControl(data.firstName, [Validators.required, Validators.minLength(3)]),
          lastName: new FormControl(data.lastName,[Validators.required, Validators.minLength(3)]),
          dni: new FormControl(data.dni, [Validators.required, Validators.minLength(10)]),
          address: new FormControl(data.address, [Validators.required, Validators.maxLength(150)]),
          phone: new FormControl(data.phone, [Validators.required, Validators.minLength(10)]),
          email: new FormControl(data.email, [Validators.required, Validators.email]),
        });
      });      
    }
  }

  operate(){
    if(this.form.invalid){
      this._snackBar.open('FORM IS INVALID', 'INFO', { duration: 2000});
      return;
    }
    const patient: Patient = new Patient();
    patient.idPatient = this.form.value['idPatient']
    patient.firstName = this.form.value['firstName']
    patient.lastName = this.form.value['lastName']
    patient.dni = this.form.value['dni']
    patient.address = this.form.value['address']
    patient.phone = this.form.value['phone']
    patient.email = this.form.value['email']

    if(this.isEdit){
      //update
      //No ideal - practica comun
      this.patientService.update(this.id,patient).subscribe(()=>{
        this.patientService.findAll().subscribe(data=>{
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('UPDATE!');

        }); 
      });
    }else{
      //inster
      //ideal - practica recomendada
      this.patientService.save(patient).pipe(switchMap( ()=>{
        return this.patientService.findAll();
      }))
      .subscribe(data =>{
        this.patientService.setPatientChange(data);
        this.patientService.setMessageChange('CREATED!');

      });
    } 
    this.router.navigate(['/pages/patient']);
  }
   //Para evitar el forms.control en el html
   get f(){
    return this.form.controls;
  }
}
