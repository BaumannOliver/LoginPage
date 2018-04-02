import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { ToStorageService } from './services/to-storage.service';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { AlertService } from './services/alert.service';


const appRoutes: Routes = [
  { path: '', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [ToStorageService, AlertService],
  entryComponents: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
