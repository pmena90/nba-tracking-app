import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-last-days-select',
  templateUrl: './last-days-select.component.html',
  styleUrls: ['./last-days-select.component.css']
})
export class LastDaysSelectComponent implements OnChanges {
  // days = Array.from({ length: 12 }, (_, i) => i + 1)
  days = [6, 12, 20];
  @Input() selectedDays = 12;
  @Output() daysChanged = new EventEmitter<number>();


  form: FormGroup = new FormGroup({
    daySelectorForm: new FormControl('12'),
  });

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.form.patchValue({ daySelectorForm: changes['selectedDays'].currentValue });
  }

  onDaysChange() {
    const days = this.form.value['daySelectorForm'];
    this.daysChanged.emit(days);
  }

}
