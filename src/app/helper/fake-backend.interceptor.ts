import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Products } from '../models/product.model';
import { products } from 'src/app/mock-api/products/products';
import { ToastrService } from 'ngx-toastr';

const FAKE_JWT_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6InVzZXIxMjMifQ.-PoRmv1cvmxGow2qkb5g_g7iwZQVlVZEvDrIwkhmkCk';
const user: User = {
  username: 'user',
  password: 'user123',
  token: FAKE_JWT_TOKEN,
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private toaster: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { url, method, headers } = request;

    let toasterAlert = this.toaster;
    let prodList: Products[] = [];
    let list = localStorage.getItem('PRODUCTS');
    if (list === null) {
      prodList = products;
      localStorage.setItem('PRODUCTS', JSON.stringify(prodList));
    } else {
      prodList = JSON.parse(list);
    }

    if (url.endsWith('login') && method === 'POST') {
      return handleLogin();
    }
    if (url.endsWith('list') && method === 'GET') {
      return handleProducts();
    }
    if (url.includes('detail') && method === 'GET') {
      return handleProductById();
    }

    if (url.endsWith('addComment') && method === 'POST') {
      return addComment();
    }

    return next.handle(request);

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer ' + FAKE_JWT_TOKEN;
    }

    function handleLogin(): Observable<HttpEvent<unknown>> {
      let body: any = request.body;
      if (body.username == user.username && body.password == user.password) {
        return of(
          new HttpResponse({
            status: 200,
            body: {
              username: user.username,
              password: user.password,
              token: user.token,
            },
          })
        );
      } else {
      toasterAlert.error('Giriş yapılamadı', 'Unauthorized', {timeOut:3000},)
        return throwError({ status: 401, error: { message: 'Unauthorized' } });
      }
    }

    function handleProducts(): Observable<HttpEvent<unknown>> {
      if (!isLoggedIn()) {
        return throwError({ status: 401, error: { message: 'Unauthorized' } });
      }

      const list: Products[] = prodList.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        product_image: item.product_image,
        price: item.price,
        description: item.description,
        rating: item.rating,
        comments: item.comments,
        date: item.date,
      }));

      return of(
        new HttpResponse({
          status: 200,
          body: list,
        })
      );
    }

    function handleProductById(): Observable<HttpEvent<unknown>> {
      if (!isLoggedIn()) {
        return throwError({ status: 401, error: { message: 'Unauthorized' } });
      }
      request.clone({
        url: request.url,
      });

      const arr = request.url.split('/');
      let product = prodList.find((prod) => prod.product_id == +arr[1]);
      return of(
        new HttpResponse({
          status: 200,
          body: product,
        })
      );
    }

    function addComment(): Observable<HttpEvent<unknown>> {
 
      let body: any = request.body;

      let product = prodList.find(
        (prod) => prod.product_id === body.product_id
      );
      product!.comments = [...product!.comments, body];
      let prodIndex = prodList.findIndex(
        (obj) => obj.product_id === body.product_id
      );
      prodList[prodIndex].comments = product!.comments;
      localStorage.setItem('PRODUCTS', JSON.stringify(prodList));
      return of(
        new HttpResponse({
          status: 200,
          body: prodList,
        })
      );
    }
  }
}
