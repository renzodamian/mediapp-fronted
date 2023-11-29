import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './material/material.module';
import { MedicComponent } from './pages/medic/medic.component';
import { HttpClientModule } from '@angular/common/http';
//import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MedicComponent,
    //PatientEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
