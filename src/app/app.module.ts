import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';


import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { EventsComponent } from './events/events.component';
import {AuthenticationService, UserService} from '@app/_services';
import {EventsService} from '@app/events.service';
import {ErrorInterceptor} from '@app/_services/error.interceptor';
import {JwtInterceptor} from '@app/_services/jwt.interceptor';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
,
        EventsComponent    ],
    providers: [

        // provider used to create fake backend
      AuthenticationService,
      UserService,
      EventsService,
      ErrorInterceptor,
      JwtInterceptor
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
