import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { User } from "../../models/User";

@Component({
  selector: 'app-scheduler-wrapper',
  templateUrl: './scheduler-wrapper.component.html'
})
export class SchedulerWrapperComponent {
  @Input()
  events: CalendarEvent[] = new Array<CalendarEvent>();
  @Input()
  users: User[];
  @Input()
  viewDate: Date;
  @Input()
  canMoveAppointments: Boolean;
  @Input()
  interval: number;
  @Input()
  defaultView: string;
  @Output()
  daySelectedChange = new EventEmitter<any>();
  @Output()
  eventActionPerformed = new EventEmitter<any>();
  @Output()
  viewDateChanged = new EventEmitter<any>();

  emitEvent(data, emitterName: string): void {
    switch (emitterName) {
      case 'daySelectedChange':
        {
          this.daySelectedChange.emit(data);
          break;
        }
      case 'eventActionPerformed':
        {
          this.eventActionPerformed.emit(data);
          break;
        }
      case 'viewDateChanged':
        {
          this.viewDateChanged.emit(data);
          break;
        }
    }
  }

  constructor() {}
}
