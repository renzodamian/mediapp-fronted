import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Observable, map } from 'rxjs';
import { ConsultListExamDTO } from 'src/app/dto/consultListExamDTO';
import { ConsultListExamDTOI } from 'src/app/dto/consultListExamDTOI';
import { MaterialModule } from 'src/app/material/material.module';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ConsultService } from 'src/app/service/consult.service';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-consult-autocomplete',
  standalone: true,
  templateUrl: './consult-autocomplete.component.html',
  styleUrls: ['./consult-autocomplete.component.css'],
  imports: [MaterialModule, ReactiveFormsModule, NgIf, NgFor, AsyncPipe]
})
export class ConsultAutocompleteComponent implements OnInit {
  patients: Patient[];
  medics: Medic[];
  form: FormGroup;
  specialties: Specialty[];
  exams: Exam[];

  medicControl: FormControl = new FormControl();

  //Observable
  patients$: Observable<Patient[]>;
  medicsFilterd$: Observable<Medic[]>;

  minDate: Date = new Date();
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar,
  
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      patient: new FormControl([Validators.required]),
      medic: this.medicControl,
      specialty : new FormControl([Validators.required]),
      consultDate: new FormControl(new Date(), [Validators.required]),
      diagnosis: new FormControl('',[Validators.required]),
      treatment: new FormControl('',[Validators.required]),
      exam: new FormControl()

    });
    this.loadInitialData();
    this.medicsFilterd$ =this.medicControl.valueChanges.pipe(map((val) => this.filterMedics(val)));
  }

  filterMedics(val: string | any) {
    if(val?.idMedic > 0 ){
      return this.medics.filter(el =>
        el.primaryName.toLowerCase().includes(val.primaryName.toLowerCase()) ||
        el.surname.toLowerCase().includes(val.surname.toLowerCase()) ||
        el.cmpMedic.includes(val.cmpMedic)
    );
    }else{
      return this.medics.filter(el =>
        el.primaryName.toLowerCase().includes(val?.toLowerCase()) ||
        el.surname.toLowerCase().includes(val?.toLowerCase()) ||
        el.cmpMedic.includes(val)
        )
    }
    
  }

  loadInitialData() {
    this.patients$ = this.patientService.findAll();//.subscribe((data) => (this.patients = data));
    this.medicService.findAll().subscribe((data) => (this.medics = data));
    this.specialtyService.findAll().subscribe(data => (this.specialties = data));
    this.examService.findAll().subscribe(data => (this.exams = data));

  }

  showMedic(val: any){
    return val ? `${val.primaryName} ${val.surname}` : val;

  }
  addDetail(){
    const det =  new ConsultDetail();
    det.diagnosis = this.form.value['diagnosis'];
    det.treatment = this.form.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index: number){
    this.details.splice(index,1);
  }

  addExam(){
    if(this.form.value['exam'] !=null){
      this.examsSelected.push(this.form.value['exam']);

    }else{
      this._snackBar.open('Please select an exam', 'INFO', {duration: 2000});
    }
  }
  save() {
    if(this.form.invalid){
      return;
    }
    const consult = new Consult();
    consult.patient = this.form.value['patient'];
    consult.medic = this.form.value['medic'];
    consult.specialty = this.form.value['specialty'];
    consult.details = this.details;
    consult.numConsult = "C1";
    consult.consultDate = moment (this.form.value['consultDate']).format('YYYY-MM-DDTHH:mm:ss');

    //Ver como esta mandado los valores
    //console.log(consult);

    /*const consultListExamDTO = new ConsultListExamDTO();
    consultListExamDTO.consult = consult;
    consultListExamDTO.lstExam = this.examsSelected;*/

    const dto: ConsultListExamDTOI = {
      consult: consult,
      lstExam: this.examsSelected
    };

    this.consultService.saveTransactional(dto).subscribe( ()=> {
      this._snackBar.open('CREATED!', 'INFO', {duration: 2000});

      setTimeout( ()=> {
        this.cleanControls();
      }, 2000);
    });
  }
  cleanControls(){
    this.form.reset();
    this.medicControl.reset();
    this.details = [];
    this.examsSelected = [];
  }
}
