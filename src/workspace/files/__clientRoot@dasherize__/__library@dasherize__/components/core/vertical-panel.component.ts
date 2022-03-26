import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'vertical-panel',
  templateUrl: 'vertical-panel.component.html'
})
export class VerticalPanelComponent {
  @Input() header = 'Header';
  @Input() disabled = false;
  @Input() cardStyle = 'p8 background-card card-outline-accent rounded'
  @Input() expanded = true;

  toggleExpanded = () => this.expanded = !this.expanded;
}
