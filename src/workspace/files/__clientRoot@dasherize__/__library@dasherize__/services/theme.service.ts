import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isLight = true;

  setOverlayContainerTheme = () => {
    if (this.isLight) {
      this.overlay.getContainerElement().classList.remove('app-dark');
      this.overlay.getContainerElement().classList.add('app-light');
    } else {
      this.overlay.getContainerElement().classList.remove('app-light');
      this.overlay.getContainerElement().classList.add('app-dark');
    }
  }

  toggleTheme = () => {
    this.isLight = !this.isLight;
    this.setOverlayContainerTheme();
  }

  constructor(
    private overlay: OverlayContainer
  ) {
    this.isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

    window.matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (e: MediaQueryListEvent) =>
        this.isLight = e.matches
      );

    this.setOverlayContainerTheme();
  }
}
