import { fromEvent, interval, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// streams
const interval$ = interval(1000);
const click$ = fromEvent(document, 'click') as Observable<MouseEvent>;

click$.pipe(switchMap(() => interval$)).subscribe(console.log);
