import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import { colors } from './colors';
import { CustomEventTitleFormatter } from 'src/app/services/custom-event-title-formatter.provider';



@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.html',
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    }
  ]
})
export class DemoComponent {
  view: CalendarView = CalendarView.Month;

  viewDate = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      color: colors.yellow,
      start: new Date(),
      draggable: true,
    },
    {
      title: 'A non draggable event',
      color: colors.blue,
      start: new Date(),
    },
  ];

  refresh = new Subject<void>();

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
