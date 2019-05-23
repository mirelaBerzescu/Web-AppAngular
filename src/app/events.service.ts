import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IEvent} from '@app/_models/event';
import { AuthenticationService } from '@app/_services';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  private url = `${environment.apiUrl}/api/events`;


  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) {


  }
  deleteEvent(id: string) {
    const t = localStorage.getItem('currentUser');
    const tc = this.authenticationService.getToken();


    return this.http.delete(`${environment.apiUrl}/api/events/${id}`,{
      headers: new HttpHeaders ({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': tc
        }
      )
    });
  }

  getEvents(): Observable<Array<IEvent>> {
    return this.http.get<Array<IEvent>>(this.url, {headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  getParticipants(event: IEvent): Observable<string[]> {

    const url = this.url + '/' + event._id + '/participants';
    return this.http.get<string[]>(url, {headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  addEvent(event: IEvent) {

    const name = event.name;
    const description = event.description;
    const location = event.location;
    const date = event.date;
    const c = 'name=' + name + '&date=' + date + '&description=' + description + '&location=' + location;
    const t = localStorage.getItem('currentUser');
    const tc = this.authenticationService.getToken();

    return this.http.post(`${environment.apiUrl}/api/events`, c , {
      headers: new HttpHeaders ({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': tc
        }
      )
    });
  }

  getEvent(id: string): Observable<IEvent> {

    const url = this.url + '/' + id;
    return this.http.get<IEvent>(url, {headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  updateEvent(event: IEvent): Observable<IEvent> {
    const name = event.name;
    const description = event.description;
    const location = event.location;
    const date = event.date;

    const token = this.authenticationService.currentUserValue.token;
    const url = this.url + '/' + event._id;
    const c = 'name=' + name + '&description=' + description + '&location=' + location + '&date' + date;

    return this.http.put<IEvent>(url, c, {headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        }
      )
    });
  }

}
