import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'datetime-picker',
  templateUrl: 'datetime-picker.component.html'
})
export class DatetimePickerComponent {
  @Input() date = new Date(Date.now());
  @Input() label = "DateTime"
  @Output() save = new EventEmitter<Date>();

  saveDatetime = (event: any) => {
    this.date = new Date(event.target.value);
    this.save.emit(this.date);
  }
}
