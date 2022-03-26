import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  GarbageService,
  ThemeService
} from '<%= dasherize(library) %>';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {
  constructor(
    private garbage: GarbageService,
    public themer: ThemeService
  ) { }

  ngOnDestroy(): void {
    this.garbage.clean();
  }
}
