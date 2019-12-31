import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

// streams
const click$ = fromEvent(document, 'click');

click$.pipe(throttleTime(3000)).subscribe(console.log);
