
import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { User } from './models/user';
import { ALASKA_LARGE_DATA } from './models/ALASKA';



@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;
  events: any[] = new Array<any>();
  users: User[] = [
    {
        "id": "76887d3f-6d8d-4c2c-bffa-a73f00e96bc3",
        "name": "Webb2, David",
        "initials": "DW"
    }
];
  viewDate: Date;
  selectedDate =  {
    '_d': new Date("2024-02-28T10:31:01.218Z")
  };
  canMoveAppointments: Boolean = true;
  interval: number = 2;
  defaultView: string = 'Month';

  data: any;
  constructor(
  ) {
  }

  ngOnInit(): void {
    const ALASKA_DATA =   {
      "allDay": false,
      "color": {
          "$type": "Wits.Service.SchedulerModule.Model.ColorModel, Wits.Service",
          "primary": "#298DF2",
          "secondary": "#EBF5FE"
      },
      "draggable": true,
      "end": new Date("2024-02-27T17:40:00.000Z"),
      "id": "eb8f9b24-ba9e-4f66-a693-b12300cb4419",
      "meta": {
          "$type": "<>f__AnonymousType100`1[[<>f__AnonymousType101`4[[System.Guid, mscorlib],[System.String, mscorlib],[System.Boolean, mscorlib],[System.String, mscorlib]], Wits.Service]], Wits.Service",
          "user": {
              "$type": "<>f__AnonymousType101`4[[System.Guid, mscorlib],[System.String, mscorlib],[System.Boolean, mscorlib],[System.String, mscorlib]], Wits.Service",
              "id": "76887d3f-6d8d-4c2c-bffa-a73f00e96bc3",
              "name": "Webb2, David",
              "showInitials": false,
              "initials": "DW"
          }
      },
      "start":  new Date("2024-02-27T17:10:00.000Z") ,
      "title": "frasrfsarfr Client: 10964, test1, Status: Scheduled, Service: _Duration Based Non-Date _7 Start/End Not Req'd",
      "metadataKey": "c0435574-ff61-40da-9f92-a84222f36a19"
  }
    this.events.push(ALASKA_DATA)
    // this.events = ALASKA_LARGE_DATA;
  }
  ngOnDestroy(): void {
  }

  eventActionPerformed(data, $event){

  }

  daySelectedChange(data, $event){

  }

  viewDateChanged(data, $event){

  }
}