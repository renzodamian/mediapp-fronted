import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';

const routes: Routes = [
  {path: 'login',component:LoginComponent },
  {
    path: 'pages/patient', component:PatientComponent,
    children:
    [
      { path: 'new', component: PatientEditComponent},
      { path: 'edit/:id', component: PatientEditComponent}
    ],
  },
  { path: 'pages/medic', component: MedicComponent },
  { path: '', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
