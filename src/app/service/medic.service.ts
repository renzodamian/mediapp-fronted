import { Injectable } from '@angular/core';
import { Medic } from '../model/medic';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends GenericService<Medic> {

    
  constructor (protected override http:HttpClient) { 
    super(http, `${environment.HOST}/medic`);
  }

}
