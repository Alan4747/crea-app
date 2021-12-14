import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { _componentsModule } from '../../components/_components.module';
import { AuthGuard } from 'src/app/shared/services/authentication/auth-guard/auth-guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/shared/services/authentication/auth.interceptor';
import { ProductResolver } from 'src/app/shared/resolvers/product.resolver';
import { ProductDetailResolver } from 'src/app/shared/resolvers/product-detail.resolver';
const Routes: Route[] = [
  {
    path: 'list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
    resolve: [ProductResolver]
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
    resolve: [ProductDetailResolver],
    runGuardsAndResolvers: 'always'
    
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [
    RouterModule.forChild(Routes),
    _componentsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class ProductModule {}
