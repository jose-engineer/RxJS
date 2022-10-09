import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mySubject$;

  ngOnInit() {
    this.mySubject$ = new BehaviorSubject(200);
    this.mySubject$.subscribe(x => console.log('first subscribe', x));
    this.mySubject$.next(1);
    this.mySubject$.next(2);
    // this.mySubject$.unsubscribe();
    this.mySubject$.subscribe(x => console.log('second subscribe', x)); //got last value 2 from first subs plus first value 3 from second subs (latest current value)
    this.mySubject$.next(3); //send notifications/values to both subscribers
    //Output: 200,1,2 2 3 3
  }

  ngOnDestroy() {
    this.mySubject$.unsubscribe();
  }
}
