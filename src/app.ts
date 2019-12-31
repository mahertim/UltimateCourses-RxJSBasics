import { fromEvent, asyncScheduler } from 'rxjs';
import { auditTime, throttleTime } from 'rxjs/operators';

// streams
const click$ = fromEvent(document, 'click');

// these act the same
// auditTime(500) == throttleTime(500, asyncScheduler, { leading: false, trailing: true })
click$
  .pipe(throttleTime(4000, asyncScheduler, { leading: false, trailing: true }))
  .subscribe(console.log);
click$.pipe(auditTime(4000)).subscribe(console.log);
