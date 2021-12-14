import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsRatesComponent } from './comments-rates.component';

describe('CommentsRatesComponent', () => {
  let component: CommentsRatesComponent;
  let fixture: ComponentFixture<CommentsRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
