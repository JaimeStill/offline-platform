import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: 'banner.component.html'
})
export class BannerComponent {
  @Input() label: string = 'App Banner';
  @Input() background: string = '#f7f7f7';
  @Input() color: string = '#333333';
}
