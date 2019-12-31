import { Observable, fromEvent } from 'rxjs';
import { sampleTime, map } from 'rxjs/operators';

// streams
const click$ = fromEvent(document, 'click') as Observable<MouseEvent>;

click$
  .pipe(
    sampleTime(4000),
    map(({ clientX, clientY }) => ({ clientX, clientY })),
  )
  .subscribe(console.log);
