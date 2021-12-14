import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { ProductModule } from './modules/product/product.module';
import { AuthGuard } from './shared/services/authentication/auth-guard/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
