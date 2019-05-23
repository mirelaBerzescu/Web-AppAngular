import {Component, Inject, Input, OnInit} from '@angular/core';
import {IEvent} from '@app/_models/event';
import {EventsService} from '@app/events.service';
import {first} from 'rxjs/operators';
import {AuthenticationService, UserService} from '@app/_services';
import {User} from '@app/_models';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Input()
  private events: Array<IEvent>;
  private newEvent: IEvent;
  private meUser: User;
  private filtEvents: Array<IEvent>;
  private event: IEvent;

  constructor(@Inject(EventsService) private eventService: EventsService , private userService: UserService) {
    this.loadUser();
    this.loadAllEvents();

    this.newEvent = {};
  }

  private loadAllEvents() {
    this.eventService.getEvents().pipe(first()).subscribe(events => {
      this.events = events;
      console.log(events);
      this.loadUser();
      this.loadParticipants();
    });
  }

  public loadParticipants(){

    for (let i = 0; i < this.events.length ; i++) {
       this.eventService.getParticipants(this.events[i]).pipe(first()).subscribe(participants => {
        this.events[i].participants = participants;
      });
    }
  }

  private loadEvent(id: string) {
    this.eventService.getEvent(id).pipe(first()).subscribe(event => {
      this.event = event;
    });
  }


  public loadUser() {
    this.userService.getMyUserInfo().pipe(first()).subscribe(meUser => {
      this.meUser = meUser;
      console.log(meUser);


    });
  // console.log(this.meUser);
  }


  public deleteEvent(event: IEvent) {
     this.loadUser();
     this.loadEvent(event._id);

     if(this.meUser != null)
      console.log(this.meUser._id);

      if(this.meUser != null) {
        if (event.creatorId === this.meUser._id) {
          this.eventService.deleteEvent(event._id).pipe(first()).subscribe(() => {
            this.loadAllEvents();
          });
          //console.log(this.user._id);
        }
      }


  }

  public onSubmit() {
    this.newEvent.createdOn = new Date().getMilliseconds();
    this.eventService.addEvent(this.newEvent).subscribe(
      (event) => this.newEvent = event
    );

  this.loadAllEvents();
    this.loadAllEvents();


  }


  ngOnInit() {

  }


}
