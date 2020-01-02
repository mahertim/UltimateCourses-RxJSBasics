import { fromEvent, interval } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';

// streams
// const click$ = fromEvent(document, 'click');
const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');
const interval$ = interval(1000);
const betterInterval = interval$.pipe(takeUntil(mouseup$));

mousedown$.pipe(mergeMap(() => betterInterval)).subscribe(console.log);
