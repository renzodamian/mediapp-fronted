import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import { NgFor } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-patient',
  standalone: true,
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  imports: [MaterialModule, NgFor,RouterLink ,RouterOutlet]

})
export class PatientComponent implements OnInit{
  displayedColumns: string []=['id','firstName','lastName','dni','actions'];
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(
    private patientService: PatientService,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    //Es  unicamente va a reacionar o a jeecutar cuando en 
    //algun lugar del codigo cuando le hallan hecho un next 
    //a la variable getPatientChange
    this.patientService.getPatientChange().subscribe(data => {
      this.createTable(data);
    });

    this.patientService.getMessageChange().subscribe(data =>{
      this._snackBar.open(data,'INFO', {duration:2000, horizontalPosition:'right',verticalPosition:'top'});
    })

    //Carga de los Pacientes 
    //Apenas carga el componetne por priemra vez, 
    //carga el componente Paciente
    // este bloque es accionado, porque esta trayendo 
    //por primera vez apenas carga la pagina.
    this.patientService.findAll().subscribe(data =>{
      this.createTable(data);
    });

  }
  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: Patient[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
  }

  delete(idPatient: number){
    this.patientService.delete(idPatient)
    .pipe(switchMap(() => this.patientService.findAll()))
    .subscribe(data => {
      this.createTable(data);
      this.patientService.setMessageChange('DELEDTED!');
    })
  }
}
