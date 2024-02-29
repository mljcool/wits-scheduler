import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  month(event: CalendarEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      'h:mm a',
      this.locale
    )}</b> ${event.title}`;
  }

  week(event: CalendarEvent): string {
    console.log('event week', event);
    var title = `${event.title}`;
    if (event?.meta?.user && event.meta?.user?.showInitials) {
      title = `<b>${event?.meta?.user?.initials}:</b> ${event.title}`;
    }
    return title;
  }
}
