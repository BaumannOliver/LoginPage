import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AnimationService } from './service/animation.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AnimationService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
