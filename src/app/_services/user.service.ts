import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import {map, timeout} from 'rxjs/operators';
import {getResponseURL} from '@angular/http/src/http_utils';
import {IEvent, PostSchema} from '@app/_models/event';
import {Observable} from 'rxjs';
import {AuthenticationService} from '@app/_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient,  private authService: AuthenticationService) { }
  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`, {headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/api/users/${id}`, {headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  register(user: User) {
    const name = user.name;
    const email = user.email;
    const password = user.password;
    const type = 2;
    const c = 'name=' + name + '&email=' + email + '&password=' + password + '&type=' + type;
    console.log(c);
    return this.http.post(`${environment.apiUrl}/api/auth/register`, c,
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')})
      .pipe(
        timeout(5000)
      );
  }

   update (user: User) {
    return this.http.put(`${environment.apiUrl}/users/${user._id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/users/${id}`,{headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  addPost(event: IEvent , p: PostSchema): Observable<PostSchema> {
    const date = p.date;
    const content = p.content;
    const c = 'date=' + date + '&content=' + content;

    return  this.http.post<PostSchema>(`${environment.apiUrl}/api/events/${event._id}/posts`, c, {headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  getPosts(event: IEvent): Observable<PostSchema[]>{
    return  this.http.get<PostSchema[]>(`${environment.apiUrl}/api/events/${event._id}/posts`,{headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  getParticipants(event: IEvent): Observable<string[]> {
    return  this.http.get<string[]>(`${environment.apiUrl}/api/events/{$event._id}/participants`,{headers: new HttpHeaders('Content-Type: application/x-www-form-urlencoded')});
  }

  getMyUserInfo(): Observable<User> {
    const tc = this.authService.getToken();
    //console.log(tc);

    return  this.http.get<User>(`${environment.apiUrl}/api/auth/me`,{headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': tc
        }
      )
    });
  }
}
