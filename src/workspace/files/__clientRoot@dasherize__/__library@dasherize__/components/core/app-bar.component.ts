import {
  Component,
  Input
} from '@angular/core';

import { ThemeService } from '../../services';

@Component({
  selector: 'app-bar',
  templateUrl: 'app-bar.component.html'
})
export class AppBarComponent {
  @Input() color = 'primary';
  @Input() darkColor = 'color-text';
  @Input() darkIcon = 'brightness_3';
  @Input() homeLink = 'home';
  @Input() lightColor = 'color-amber';
  @Input() lightIcon = 'brightness_5';
  @Input() module = 'App';

  constructor(
    public themer: ThemeService
  ) { }
}
