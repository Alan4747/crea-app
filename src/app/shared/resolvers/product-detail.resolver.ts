import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api/api.service';
@Injectable({
  providedIn: 'root',
})
export class ProductDetailResolver implements Resolve<boolean> {
  constructor(private apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
     const id = route.paramMap.get('id');
    return this.apiService.getProductById(id);
  }
}
