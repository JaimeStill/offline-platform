import { Component } from '@angular/core';
import { ThemeService } from '<%= dasherize(library) %>';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    public themer: ThemeService
  ) { }
}
