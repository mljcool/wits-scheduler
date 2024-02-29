import { NgModule, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { SchedulerComponent } from "./components/scheduler/scheduler.component";
import { SchedulerWrapperComponent } from "./components/scheduler-wrapper/scheduler-wrapper.component";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DayViewSchedulerComponent } from "./components/day-view-scheduler/day-view-scheduler.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DatepickerComponent } from "./components/datepicker/datepicker.component";
import { UserEventFilterPipe } from "./components/filters/user-event-filter-pipe";
import { ShowUserEventsFilterPipe } from "./components/filters/show-user-events-filter-pipe";
import { MatCardModule } from "@angular/material/card";
import { EventTooltipComponent } from "./components/event-tooltip/event-tooltip.component";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { PopoverModule } from "ngx-smart-popover";
import { DemoComponent } from "./components/test-scheduler/DemoComponent.component";
import { CalendarHeaderComponent } from "./components/test-scheduler/calendar-header.component";
import { AppComponent } from "./app.component";

@NgModule({
	declarations: [
		AppComponent,
		CalendarHeaderComponent,
		DemoComponent,
		SchedulerComponent,
		SchedulerWrapperComponent,
		DayViewSchedulerComponent,
		DatepickerComponent,
		UserEventFilterPipe,
		ShowUserEventsFilterPipe,
		EventTooltipComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory,
		}),
		MatButtonModule,
		MatIconModule,
		MatButtonToggleModule,
		MatDatepickerModule,
		MatMomentDateModule,
		MatCardModule,
		MatSelectModule,
		MatMenuModule,
		PopoverModule,
	],
	entryComponents: [
		SchedulerComponent,
		DemoComponent,
		SchedulerWrapperComponent,
		DatepickerComponent,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(private injector: Injector) {
	}
      
	ngDoBootstrap() {
	  const elements: any[] = [
	    [SchedulerWrapperComponent, 'app-scheduler-wrapper'],
	    [DatepickerComponent, 'app-datepicker']
	  ];
      
	  for (const [component, name] of elements) {
	    const el = createCustomElement(component, { injector: this.injector });
	    customElements.define(name, el);
	  }
	}
}
