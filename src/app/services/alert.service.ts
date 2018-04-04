import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private readonly router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
   }

   public success (message: string) {
    this.subject.next({ type: 'success', text: message });
    console.log(this.subject);
   }

   public error (message: string) {
     this.subject.next({ type: 'error', text: message });
   }

   getMessage(): Observable<any> {
     return this.subject.asObservable();
   }

}
