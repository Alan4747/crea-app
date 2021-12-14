import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Comments } from 'src/app/models/product.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit {

  @Input()
  switchCase?: string;
  
  @Input() 
  comments: any;

  @Output()
  addComments: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }
 
  switchBtn(active:any) {
    this.switchCase = active;
    this.cdr.detectChanges();
    
  }
}
