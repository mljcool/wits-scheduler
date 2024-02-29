import {
        ChangeDetectorRef,
        Component,
        ElementRef,
        EventEmitter,
        Inject,
        Input,
        LOCALE_ID,
        OnChanges,
        Output,
        SimpleChanges,
      } from '@angular/core';
      import {
        CalendarWeekViewComponent,
        DateAdapter,
        getWeekViewPeriod,
        CalendarWeekViewBeforeRenderEvent
      } from 'angular-calendar';
      import {
        WeekViewTimeEvent,
        CalendarEvent,
        WeekViewAllDayEvent,
      } from 'calendar-utils';
      import { DragEndEvent, DragMoveEvent } from 'angular-draggable-droppable';
      import { User } from '../../models/user';
      import { DayViewSchedulerCalendarUtils, DayViewScheduler } from './day-view-scheduler-calendar-utils';
      import { Subject } from 'rxjs';
      import { MatMenuTrigger } from '@angular/material/menu';
      import * as _ from "lodash";
      
      @Component({
        selector: 'app-day-view-scheduler',
        templateUrl: 'day-view-scheduler.component.html',
        providers: [DayViewSchedulerCalendarUtils],
      })
      export class DayViewSchedulerComponent extends CalendarWeekViewComponent
        implements OnChanges {
        @Input()
        users: User[] = [];
        @Input()
        canMoveAppointments: Boolean;
        @Input()
        interval: number;
        @Input()
        refresh: Subject<any>;
        @Output()
        userChanged = new EventEmitter();
        @Output()
        eventActionPerformed = new EventEmitter();
        @Output()
        hourSegmentClicked = new EventEmitter<{
          date: Date;
          sourceEvent: MouseEvent;
        }>();
        @Output()
        beforeViewRender = new EventEmitter<CalendarWeekViewBeforeRenderEvent>();
      
        view: DayViewScheduler;
        daysInWeek = 1;
        matMenuTrigger: MatMenuTrigger;
      
        closePopups() {
          if (this.matMenuTrigger) {
            this.matMenuTrigger.closeMenu();
          }
        }
      
        openMenu(menuTrigger: MatMenuTrigger) {
          if (this.matMenuTrigger && this.matMenuTrigger !== menuTrigger) {
            this.matMenuTrigger.closeMenu();
          }
          this.matMenuTrigger = menuTrigger;
          this.cdr.detectChanges();
        }
      
        constructor(
          protected cdr: ChangeDetectorRef,
          protected utils: DayViewSchedulerCalendarUtils,
          @Inject(LOCALE_ID) locale: string,
          protected dateAdapter: DateAdapter,
          protected element: ElementRef<HTMLElement>
        ) {
          super(cdr, utils, locale, dateAdapter, element);
        }
      
        trackByUserId = (index: number, row: User) => row.id;
      
        ngOnChanges(changes: SimpleChanges): void {
          super.ngOnChanges(changes);
          if (changes.interval) {
            this.refresh.next();
          }
        }
      
        getDayColumnWidth(eventRowContainer: HTMLElement): number {
          return Math.floor(eventRowContainer.offsetWidth / this.users.length);
        }
      
        dragMove(dayEvent: WeekViewTimeEvent, dragEvent: DragMoveEvent) {
          if (this.snapDraggedEvents) {
            const newUser = this.getDraggedUserColumn(dayEvent, dragEvent.x);
            const newEventTimes = this.getDragMovedEventTimes(
              dayEvent,
              { ...dragEvent, x: 0 },
              this.dayColumnWidth,
              true
            );
            const originalEvent = dayEvent.event;
            const adjustedEvent = {
              ...originalEvent,
              ...newEventTimes,
              meta: { ...originalEvent.meta, user: newUser },
            };
            const tempEvents = this.events.map((event) => {
              if (event === originalEvent) {
                return adjustedEvent;
              }
              return event;
            });
            this.restoreOriginalEvents(
              tempEvents,
              new Map([[adjustedEvent, originalEvent]])
            );
          }
          this.dragAlreadyMoved = true;
        }
      
        dragEnded(
          weekEvent: WeekViewAllDayEvent | WeekViewTimeEvent,
          dragEndEvent: DragEndEvent,
          dayWidth: number,
          useY = false
        ) {
          const newUser = this.getDraggedUserColumn(weekEvent, dragEndEvent.x);
          if (newUser && newUser.id !== weekEvent.event.meta.user.id) {
            const newEventTimes = this.getDragMovedEventTimes(
              weekEvent,
              { ...dragEndEvent, x: 0 },
              this.dayColumnWidth,
              true
            );
      
            weekEvent.event.start = newEventTimes.start;
            weekEvent.event.end = newEventTimes.end;
            this.userChanged.emit({ event: weekEvent.event, newUser });
            this.handleEvent('Reassigned', weekEvent.event);
          } else {
            super.dragEnded(
              weekEvent,
              {
                ...dragEndEvent,
                x: 0,
              },
              dayWidth,
              useY
            );
          }
        }
      
        protected getWeekView(events: CalendarEvent[]) {
          console.log('period', events);
          return this.utils.getWeekView({
            events,
            users: this.users,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            precision: this.precision,
            absolutePositionedEvents: true,
            hourSegments: this.hourSegments,
            dayStart: {
              hour: this.dayStartHour,
              minute: this.dayStartMinute,
            },
            dayEnd: {
              hour: this.dayEndHour,
              minute: this.dayEndMinute,
            },
            segmentHeight: this.hourSegmentHeight,
            weekendDays: this.weekendDays,
            ...getWeekViewPeriod(
              this.dateAdapter,
              this.viewDate,
              this.weekStartsOn,
              this.excludeDays,
              this.daysInWeek
            ),
          });
        }
      
        private getDraggedUserColumn(
          dayEvent: WeekViewTimeEvent | WeekViewAllDayEvent,
          xPixels: number
        ) {
          const columnsMoved = Math.round(xPixels / this.dayColumnWidth);
          const currentColumnIndex = this.view.users.findIndex(
            (user) => user.id === dayEvent.event.meta.user.id
          );
          const newIndex = currentColumnIndex + columnsMoved;
          return this.view.users[newIndex];
        }
      
        handleEvent(action: string, event: CalendarEvent): void {
          this.eventActionPerformed.emit({ event, action });
          this.closePopups();
        }
      }
      