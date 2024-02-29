import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { User } from "../../models/user";

@Pipe({
  name: 'showUsersEventsFilter',
  pure: false
})
export class ShowUserEventsFilterPipe implements PipeTransform {
  transform(users: User[], events: CalendarEvent[]): User[] {
    if (!events || !users) {
      return users;
    }

    return users.sort((a, b) => <any>new Date(a.name) - <any>new Date(b.name)).filter(user => events.map(e => e.meta.user.id).indexOf(user.id) !== -1);
  }
}
