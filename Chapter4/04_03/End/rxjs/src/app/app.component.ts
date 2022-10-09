import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient){}
  searchSubject$ = new Subject<string>();
  results$: Observable<any>;

  ngOnInit() {
    this.results$ = this.searchSubject$ //you don't need to subscribe because you are using async pipe
      .debounceTime(200)
      .distinctUntilChanged() //skip any values that are identical to the previous value
      .do(x => console.log('do', x))
      .switchMap(searchString => this.queryAPI(searchString)) //>We use switchMap because if changing the search string while we're waiting for the query to come back
                                                              //we want it to cancel the old one and replace it.

  }

queryAPI(searchString){
  console.log('queryAPI', searchString);
  return this.http.get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`)
  .map(result => result['data']['children'])
}

  inputChanged($event) {
    console.log('input changed', $event);
    this.searchSubject$.next($event);
  }

  ngOnDestroy() { }
}
