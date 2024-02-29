import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerComponent {
  @Input()
  selectedDate: any;
  @Output()
  daySelectedChange = new EventEmitter<any>();

  constructor() {}

  emitEvent(data, emitterName: string): void {
    switch (emitterName) {
    case 'daySelectedChange':
    {
      this.daySelectedChange.emit(data);
      break;
    }
    }
  }
}
