import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { Observable} from 'rxjs';
import { ApiService } from '../services/api/api.service';
@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<boolean> {
  constructor(private apiService: ApiService) { }

  resolve(): Observable<any> {
   return this.apiService.getProducts();
  }
}
