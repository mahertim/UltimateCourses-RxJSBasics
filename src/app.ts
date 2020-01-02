import { fromEvent, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  takeUntil,
  tap,
  finalize,
  switchMapTo,
  pluck,
  exhaustMap,
} from 'rxjs/operators';

// helpers

// elements
const startButton = document.getElementById('start') as HTMLButtonElement;
const stopButton = document.getElementById('stop') as HTMLButtonElement;
const pollingStatus = document.getElementById(
  'polling-status',
) as HTMLButtonElement;
const dogImage = document.getElementById('dog') as HTMLImageElement;

// streams
const startClicks$ = fromEvent(startButton, 'click');
const stopClicks$ = fromEvent(stopButton, 'click');

startClicks$
  .pipe(
    exhaustMap(() =>
      timer(0, 5000).pipe(
        tap(() => (pollingStatus.innerHTML = 'Active')),
        switchMapTo(
          ajax.getJSON('https://random.dog/woof.json').pipe(pluck('url')),
        ),
        takeUntil(stopClicks$),
        finalize(() => (pollingStatus.innerHTML = 'Stopped')),
      ),
    ),
  )
  .subscribe(url => (dogImage.src = url));
