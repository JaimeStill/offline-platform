import {
  AfterViewInit,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs';
import { CoreService } from '../../services';

@Component({
  selector: 'searchbar',
  templateUrl: 'searchbar.component.html'
})
export class SearchbarComponent implements AfterViewInit, OnDestroy {
  sub!: Subscription;
  @ViewChild('searchbar') searchbar!: ElementRef;

  @Input() label = 'Search';
  @Input() minimum = 2;
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter();

  constructor(
    private core: CoreService
  ) { }

  ngAfterViewInit() {
    this.sub = this.core.generateInputObservable(this.searchbar)
      .subscribe((val: string) => {
        val && val.length >= this.minimum
          ? this.search.emit(val)
          : this.clear.emit();
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
