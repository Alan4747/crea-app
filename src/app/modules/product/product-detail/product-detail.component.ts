import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/product.model';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit {
  headerName = 'Product Detail';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: any;
  switchCase?: string = 'comments';
  star?: number;
  product?: Products;
  count?: any;
  loading = false;
  
  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data[0];
    this.selectedValue = this.product?.rating.rate;
    this.count = this.product?.comments.length;
  }

  giveStar(star: any) {
    this.selectedValue = star;
    this.switchCase = 'comments-and-rates';
    this.cdr.detectChanges();
  }
  showCommentsAndRates(active: any) {
    this.switchCase = 'comments-and-rates';
    this.cdr.detectChanges();
  }

  getProductDetail() {
    this.apiService
      .getProductById(this.product?.product_id)
      .subscribe((data) => {
        this.product = data;
        this.count = this.product?.comments.length;
        this.toaster.success('Added Comment', '', { timeOut: 3000 });
        this.cdr.detectChanges();
      });
  }
}
