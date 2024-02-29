import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { User } from "../../models/user";

@Component({
  selector: 'app-event-tooltip',
  templateUrl: './event-tooltip.component.html',
  styleUrls: ['./event-tooltip.component.scss']
})
export class EventTooltipComponent implements OnInit {
  @Input()
  event: CalendarEvent;
  @Input()
  users: User[];
  @Input()
  canMoveAppointments: Boolean;
  @Output()
  eventDeleted = new EventEmitter<any>();
  @Output()
  eventEdited = new EventEmitter<any>();
  @Output()
  closePopup = new EventEmitter<any>();
  @Output()
  reassignEvent = new EventEmitter<any>();
  selectedUserId: any;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  raiseDeleteEvent(event: CalendarEvent) {
    this.eventDeleted.emit({ event }); 
  }

  raiseEditEvent(event: CalendarEvent) {
    this.eventEdited.emit({ event });
  }

  raiseCloseEvent() {
    this.closePopup.emit();
  }

  detectChanges() {
    this.ref.detectChanges();
  }
  
  userSelected() {
    this.ref.detectChanges();
    const user = this.users.find(u => u.id === this.selectedUserId);
    this.event.meta.user = user;
    this.reassignEvent.emit({ event });
  }
}
