import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { AlertService } from './services/alert.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {RegisterService} from './services/register.service';
import {UsersService} from './services/users.service';
import {AuthGuard} from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from "./services/in-memory-data.service";


const appRoutes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService
    )
  ],
  providers: [LoginService, AlertService, LoginService, RegisterService, UsersService, AuthGuard],
  entryComponents: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
