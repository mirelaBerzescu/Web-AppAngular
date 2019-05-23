import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { timeout } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { getOrCreateCurrentQueries } from '@angular/core/src/render3/instructions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public token: String;

  constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public getToken(): string {

       return this.currentUserValue.token;
    }


    login(email: string, password: string) {
         console.log(email);
         console.log(JSON.stringify({email, password}));
         const c = 'email=' + email + '&password=' + password;
         console.log(c);

        return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, c, {
            headers: new  HttpHeaders ({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }).pipe(
            timeout(5000), //5 seconds
            map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
                }
            )
        )
    };
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        // this.currentUserSubject.value.token = null; 
    }
}
