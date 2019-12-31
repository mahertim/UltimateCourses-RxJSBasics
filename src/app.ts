import { Observable, fromEvent, interval } from 'rxjs';
import { sample } from 'rxjs/operators';

// streams
const click$ = fromEvent(document, 'click') as Observable<MouseEvent>;
const timer$ = interval(1000);

timer$.pipe(sample(click$)).subscribe(console.log);
