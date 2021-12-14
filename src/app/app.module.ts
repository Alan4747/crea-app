import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ProductModule } from './modules/product/product.module';
import { _componentsModule } from './components/_components.module';
import { AutoFocusDirective } from './directives/autoFocus.directive';
import { CommonModule } from '@angular/common';
import { ProductService } from './shared/services/product/product.service';
import { FakeBackendInterceptor } from './helper/fake-backend.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, LoginComponent, AutoFocusDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule,
    _componentsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()

  ],
  providers: [
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
