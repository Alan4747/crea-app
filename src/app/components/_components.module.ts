import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProductFeaturesComponent } from './product-features/product-features.component';
import { CommentsRatesComponent } from './comments-rates/comments-rates.component';

@NgModule({
  imports: [FormsModule, RouterModule, CommonModule, BrowserModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    TabsComponent,
    ProductFeaturesComponent,
    CommentsRatesComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TabsComponent,
    ProductFeaturesComponent,
    CommentsRatesComponent

  ],
})
export class _componentsModule {}
