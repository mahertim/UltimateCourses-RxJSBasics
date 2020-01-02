import { interval, fromEvent, merge, empty } from 'rxjs';
import { scan, mapTo, takeWhile, startWith, switchMap } from 'rxjs/operators';

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const pauseButton = document.getElementById('pause');
const startButton = document.getElementById('start');

// streams
const counter$ = interval(1000);
const pauseClick$ = fromEvent(pauseButton, 'click');
const startClick$ = fromEvent(startButton, 'click');

const COUNTDOWN_FROM = 20;

merge(startClick$.pipe(mapTo(true)), pauseClick$.pipe(mapTo(false)))
  .pipe(
    switchMap(shouldStart => {
      return shouldStart ? counter$ : empty();
    }),
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, COUNTDOWN_FROM),
    takeWhile(value => value >= 0),
    startWith(COUNTDOWN_FROM),
  )
  .subscribe((value: any) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });
