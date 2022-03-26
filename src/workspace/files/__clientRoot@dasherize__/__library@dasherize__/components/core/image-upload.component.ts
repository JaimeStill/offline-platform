import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'image-upload',
  templateUrl: 'image-upload.component.html',
  styleUrls: ['image-upload.component.scss']
})
export class ImageUploadComponent {
  @Input() src: string;
  @Input() editable = false;
  @Input() imageSize = 160;
  @Input() imgClasses = 'p4 rounded';
  @Input() iconSize = 80;
  @Input() iconClass= 'material-icons-outlined';
  @Input() icon = 'insert_photo';

  @Output() imageSelected = new EventEmitter<FormData>();

  fileChange = (event: any) => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      const file = event.target.files[0] as File;
      formData.append(file.name, file);
      this.imageSelected.emit(formData);
    }
  }
}
