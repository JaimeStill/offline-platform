import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: 'date-picker.component.html'
})
export class DatePickerComponent {
  @Input() date = new Date(Date.now());
  @Input() label = 'Date';
  @Output() save = new EventEmitter<Date>();

  saveDate = (event: any) => {
    const date = event.target.value.split("-");
    this.date = new Date(+date[0],+date[1] - 1, +date[2]);
    this.save.emit(this.date);
  }
}
