import {
  Component,
  Input
} from '@angular/core';

import { Tab } from '../../models';

@Component({
  selector: 'vertical-nav',
  templateUrl: 'vertical-nav.component.html',
  styles: [
    '.tab { text-align: center; }'
  ],
  host: {
    'class': 'min-full-height'
  }
})
export class VerticalNavComponent {
  @Input() heading: string;
  @Input() headingStyle = 'mat-subheading-2 bold m4';
  @Input() size = 180;
  @Input() collapsedSize = 50;
  @Input() expanded = true;

  @Input() tabs: Array<Tab>;
  @Input() tabAlignment = 'start stretch';
  @Input() tabStyle = 'mat-subheading-2 p8 m0';
  @Input() activeStyle = 'el-4 clip-right background-stacked';

  calculateWidth = () => this.expanded
    ? this.size
    : this.collapsedSize;

  toggleExpanded = () => this.expanded = !this.expanded;

  getTabs = () => this.tabs?.filter(tab => !tab.hide);
}
