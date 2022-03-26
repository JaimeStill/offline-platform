import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  BannerService,
  GarbageService,
  ThemeService
} from '<%= dasherize(library) %>';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private garbage: GarbageService,
    public banner: BannerService,
    public themer: ThemeService
  ) { }

  ngOnInit(): void {
    this.banner.getConfig();
  }

  ngOnDestroy(): void {
    this.garbage.clean();
  }
}
