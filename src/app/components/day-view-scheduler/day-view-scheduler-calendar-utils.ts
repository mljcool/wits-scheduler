import { Injectable } from '@angular/core';
import { CalendarUtils } from 'angular-calendar';
import { WeekView, GetWeekViewArgs } from 'calendar-utils';
import { User } from '../../models/user';

export interface DayViewScheduler extends WeekView {
  users: User[];
}

export interface GetWeekViewArgsWithUsers extends GetWeekViewArgs {
  users: User[];
}

@Injectable()
export class DayViewSchedulerCalendarUtils extends CalendarUtils {
  getWeekView(args: GetWeekViewArgsWithUsers): DayViewScheduler {
    const { period } = super.getWeekView(args);
    const view: DayViewScheduler = {
      period,
      allDayEventRows: [],
      hourColumns: [],
      users: [...args.users],
    };

    view.users.forEach((user, columnIndex) => {
      const events = args.events.filter((event) => event.meta.user.id === user.id);
      const columnView = super.getWeekView(({
        ...args,
        events,
      }));
      view.hourColumns.push(columnView.hourColumns[0]);
      columnView.allDayEventRows.forEach(({ row }, rowIndex) => {
        view.allDayEventRows[rowIndex] = view.allDayEventRows[rowIndex] ||
        {
          row: [],
        };
        view.allDayEventRows[rowIndex].row.push({
          ...row[0],
          offset: columnIndex,
          span: 1,
        });
      });
    });

    return view;
  }
}
