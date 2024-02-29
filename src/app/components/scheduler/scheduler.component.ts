import {
        Component,
        Output,
        Input,
        EventEmitter,
        OnInit,
        ChangeDetectorRef,
        ChangeDetectionStrategy
      } from '@angular/core';
      import {
        isSameDay,
        isSameMonth,
      } from 'date-fns';
      import { Subject } from 'rxjs';
      import {
        CalendarEvent,
        CalendarEventTimesChangedEvent,
        CalendarView,
        CalendarEventTitleFormatter,
        CalendarWeekViewBeforeRenderEvent
      } from 'angular-calendar';
      import { WeekViewHourColumn } from 'calendar-utils';
      import { User } from "../../models/user";
      import { CustomEventTitleFormatter } from '../../services/custom-event-title-formatter.provider';
      import { MatMenuTrigger } from '@angular/material/menu';
      @Component({
        selector: 'app-scheduler',
        changeDetection: ChangeDetectionStrategy.OnPush,
        templateUrl: './scheduler.component.html',
        styleUrls: ['./scheduler.component.scss'],
        providers: [
          {
            provide: CalendarEventTitleFormatter,
            useClass: CustomEventTitleFormatter,
          }
        ]
      })
      
      export class SchedulerComponent implements OnInit {
        @Input()
        events: CalendarEvent[];
        @Input()
        users: User[];
        @Input()
        viewDate = new Date();
      
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
      
        matMenuTrigger: MatMenuTrigger;
        view: CalendarView = CalendarView.Day;
        CalendarView = CalendarView;
        activeDayIsOpen: Boolean = false;
        refresh: Subject<any> = new Subject();
        hourColumns: WeekViewHourColumn[];
      
        constructor(private cdr: ChangeDetectorRef) {
        }
      
        addEventAtTimeSlot(date) {
          this.handleEvent('Edited', null);
        }
      
        calNextPreviousClicked() {
          this.activeDayIsOpen = false;
          this.viewDateChanged.emit({ date: this.viewDate });
        }
      
        closeMenu() {
          if (this.matMenuTrigger) {
            this.matMenuTrigger.closeMenu();
          }
        }
      
      
      
        dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
          if (isSameMonth(date, this.viewDate)) {
            if (
              (isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
                events.length === 0
            ) {
              this.activeDayIsOpen = false;
            } else {
              this.activeDayIsOpen = true;
            }
            this.viewDate = date;
          }
          this.daySelectedChange.emit({ date: this.viewDate, isMonthView: this.view === CalendarView.Month });
        }
      
        deleteEvent(eventToDelete: CalendarEvent) {
          this.events = this.events.filter((event) => event !== eventToDelete);
        }
      
        eventTimesChanged({
          event,
          newStart,
          newEnd,
        }: CalendarEventTimesChangedEvent): void {
          console.log('start -', new Date(event.start.getTime()).toLocaleString());
          console.log('newStart -', new Date(newStart.getTime()).toLocaleString());
          console.log('end -', new Date(event.end.getTime()).toLocaleString());
          console.log('newEnd -', new Date(newEnd.getTime()).toLocaleString());
          // debugger
          if (event.start.getTime() !== newStart.getTime() || event.end.getTime() !== newEnd.getTime()) {
            this.events = this.events.map((iEvent) => {
              if (iEvent.id === event.id) {
                return {
                  ...event,
                  start: newStart,
                  end: newEnd,
                };
              }
              return iEvent;
            });
            var newEvent = this.events.find(e => e.id === event.id);
            console.log('newEvent', newEvent);
            this.handleEvent('Moved', newEvent);
            this.refresh.next();
      
          }
        }
      
        handleEvent(action: string, event: CalendarEvent): void {
          this.eventActionPerformed.emit({ event, action });
          this.closeMenu();
          this.refresh.next();
        }
      
        handleEventFromDayViewScheduler(dayViewSchedulerEvent: any): void {
          const event = dayViewSchedulerEvent['event'];
          const action = dayViewSchedulerEvent['action'];
          this.eventActionPerformed.emit({ event, action });
        }
      
        ngOnInit() {
          this.viewDate = new Date();
        }
      
        openMenu(menuTrigger: MatMenuTrigger) {
          if (this.matMenuTrigger && this.matMenuTrigger !== menuTrigger) {
            this.matMenuTrigger.closeMenu();
          }
      
          this.matMenuTrigger = menuTrigger;
          this.matMenuTrigger.openMenu();
          this.cdr.detectChanges();
        }
      
        setViewDateToday() {
          this.daySelectedChange.emit({ date: new Date() });
        }
      
        setView(view: CalendarView) {
          this.view = view;
          this.daySelectedChange.emit({ date: this.viewDate, isMonthView: this.view === CalendarView.Month });
        }
      
        timeSelected(selectedTime) {
          this.viewDate = selectedTime;
          this.daySelectedChange.emit({ date: this.viewDate, isMonthView: this.view === CalendarView.Month });
          this.addSelectedDayViewClass();
        }
      
        beforeWeekOrDayViewRender(event: CalendarWeekViewBeforeRenderEvent) {
          this.hourColumns = event.hourColumns;
          this.addSelectedDayViewClass();
        }
      
        userChanged({ event, newUser }) {
          event.meta.user = newUser;
          this.events = [...this.events];
        }
      
        private addSelectedDayViewClass() {
          this.hourColumns.forEach((column) => {
            column.hours.forEach((hourSegment) => {
              hourSegment.segments.forEach((segment) => {
                delete segment.cssClass;
                if ( this.viewDate && segment.date.getTime() === this.viewDate.getTime() ) {
                  segment.cssClass = 'cal-day-selected';
                }
              });
            });
          });
        }
      }
      