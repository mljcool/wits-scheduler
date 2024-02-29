import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { User } from "../../models/user";

@Pipe({
  name: 'userEventFilter',
  pure: false
})
export class UserEventFilterPipe implements PipeTransform {
  transform(events: CalendarEvent[], user: User): CalendarEvent[] {
    if (!events || !user) {
      return events;
    }
    return events.sort((a, b) => <any>new Date(a.start) - <any>new Date(b.start)).filter(event => event.meta.user.id === user.id);
  }
}
