import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Comments, Products } from '../../../models/product.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  currentDetail: any;
  comments: any;
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('login', { username, password });
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>('list').pipe(delay(2000));
  }

  getProductById(prodID: any): Observable<Products> {
    return this.http.get<Products>('detail/'+prodID).pipe(delay(2000));
  }

  addComment(body:any): Observable<Comments>{
    return this.http.post<Comments>('addComment', body).pipe(delay(2000));
  }
}
