import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'indicator',
  templateUrl: 'indicator.component.html'
})
export class IndicatorComponent {
  @Input() tooltip: string = 'indicator';
  @Input() color: string = 'warn';
  @Input() margin: string = 'm4';
  @Input() size: number = 8;

  styles = () => `background-${this.color} ${this.margin}`;
}
