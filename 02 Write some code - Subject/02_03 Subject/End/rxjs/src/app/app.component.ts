import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mySubject$;

  ngOnInit() {
    this.mySubject$ = new Subject();
    this.mySubject$.subscribe(x => console.log('first subscribe', x)); //got 1,2 and 3
    this.mySubject$.next(1);
    this.mySubject$.next(2);
    //this.mySubject$.unsubscribe(); //if you unsubscribe the Subject, you can't use it again, so the second subscribe will send an error
    this.mySubject$.subscribe(x => console.log('second subscribe', x)); //got 3 only, we only get notified of events after we've subscribed
    this.mySubject$.next(3); //send notification 3 to both subscribers
    //final output: 1,2,3,3
  }

  ngOnDestroy() {
    this.mySubject$.unsubscribe();
  }
}
