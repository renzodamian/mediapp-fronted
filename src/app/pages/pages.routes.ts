import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { MedicComponent } from './medic/medic.component';
import { ExamComponent } from './exam/exam.component';
import { ExamEditComponent } from './exam/exam-edit/exam-edit.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';
import { Consult } from '../model/consult';
import { ConsultAutocompleteComponent } from './consult-autocomplete/consult-autocomplete.component';

export const PagesRoutes: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
    children: [
      {
        path: 'new',
        component: PatientEditComponent,
      },
      {
        path: 'edit/:id',
        component: PatientEditComponent,
      },
    ],
  },
  {
    path: 'exam',
    component: ExamComponent,
    children: [
      {
        path: 'new',
        component: ExamEditComponent,
      },
      {
        path: 'edit/:id',
        component: ExamEditComponent,
      },
    ],
  },
  {
    path: 'specialty',
    component: SpecialtyComponent,
    children: [
      {
        path: 'new',
        component: SpecialtyEditComponent,
      },
      {
        path: 'edit/:id',
        component: SpecialtyEditComponent,
      },
    ],
  },
  { path: 'medic', component: MedicComponent },
  { path: 'consult-autocomplete', component: ConsultAutocompleteComponent },
];
