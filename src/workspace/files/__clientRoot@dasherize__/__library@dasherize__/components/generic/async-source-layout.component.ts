import {
  Component,
  Input
} from '@angular/core';

import { QuerySource } from '../../models';

@Component({
  selector: 'async-source-layout',
  templateUrl: 'async-source-layout.component.html'
})
export class AsyncSourceLayoutComponent<T> {
  @Input() src: QuerySource<T>;
  @Input() inlineControls = true;
  @Input() searchLabel = 'Search';
  @Input() searchMin = 1;
  @Input() emptyLabel = 'No Data Available';
  @Input() layout = 'row | wrap';
  @Input() alignment = 'start start';
  @Input() pageStyle: string;
}
