import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToStorageService } from './service/to-storage.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ToStorageService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
