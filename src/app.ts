import { interval, fromEvent, Observable } from 'rxjs';
import { takeUntil, mapTo, scan, takeWhile } from 'rxjs/operators';

// elements
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const abortButton = document.getElementById('abort');

// streams
const counter$ = interval(1000);
let abortClick$: Observable<Event>;
if (abortButton instanceof HTMLElement) {
  abortClick$ = fromEvent(abortButton, 'click');
} else {
  abortClick$ = fromEvent(document, 'click');
}

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 5),
    takeWhile(value => value >= 0),
    takeUntil(abortClick$),
  )
  .subscribe(value => {
    if (countdown instanceof HTMLElement) {
      countdown.innerHTML = value.toString();
    }
    if (!value && message instanceof HTMLElement) {
      message.innerHTML = 'Liftoff!';
    }
  });
