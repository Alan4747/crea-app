import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Products } from 'src/app/models/product.model';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  headerName = 'Product List';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: any;
  products!: Products[];
  currentListSize = 6;
  private readonly DISPLAY_LIST_SIZE = 6;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.products = this.route.snapshot.data[0];    
  }
  viewMore(): void {
    this.currentListSize += this.DISPLAY_LIST_SIZE;
    this.products = this.products.slice(0, this.currentListSize);
    console.log(this.currentListSize);
  }
}
