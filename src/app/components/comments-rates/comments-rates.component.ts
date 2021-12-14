import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Comments, Products } from 'src/app/models/product.model';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-comments-rates',
  templateUrl: './comments-rates.component.html',
  styleUrls: ['./comments-rates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsRatesComponent implements OnInit {
  @Input()
  comments?: any;

  @Output()
  addComments: EventEmitter<any> = new EventEmitter<any>();

  comment: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: any;
  product: any;
  constructor(private cdr: ChangeDetectorRef, private api: ApiService) {}

  ngOnInit(): void {}

  giveStar(star: any) {
    this.selectedValue = star;
    console.log(this.selectedValue);

    this.cdr.detectChanges();
  }

  addComment() {
    if (this.comment === '') {
      return;
    }

    let newComment: Comments = {
      product_id: this.comments[this.comments.length - 1].product_id,
      comment_id: this.comments[this.comments.length - 1].comment_id + 1,
      userName: this.comments[this.comments.length - 1].userName,
      comment: this.comment,
      rating: this.selectedValue,
    };

    this.comment = '';
    this.selectedValue = 0;
    this.api.addComment(newComment).subscribe();
    this.addComments.emit(newComment);
    this.cdr.detectChanges();
  }
}
