import { fromEvent, interval, Observable } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
import { concatMap, take } from 'rxjs/operators';

// streams
const interval$ = interval(1000) as Observable<number>;
const click$ = fromEvent(document, 'click') as Observable<MouseEvent>;

click$
  .pipe(
    concatMap(
      (): Observable<number> => {
        return interval$.pipe(take(3));
      },
    ),
  )
  .subscribe(console.log);
