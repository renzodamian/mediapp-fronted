import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';
import { NgFor } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-patient',
  standalone: true,
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  imports: [MaterialModule, NgFor,RouterLink,RouterOutlet]

})
export class PatientComponent implements OnInit{
  displayedColumns: string []=['id','firstName','lastName','dni','actions'];
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private patientService: PatientService ){

}

  ngOnInit(): void {
    //Carga de los Pacientes
    this.patientService.findAll().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });

  }
  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

}
