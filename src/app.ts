import { Observable, fromEvent } from 'rxjs';
import { map, pluck, mapTo } from 'rxjs/operators';

// of(1, 2, 3, 4, 5)
//   .pipe(map(value => value * 10))
//   .subscribe(console.log);

const keyup$: Observable<Event> = fromEvent(document, 'keyup');

const keycode$ = keyup$.pipe(
  map(event => {
    if (event instanceof KeyboardEvent) {
      return event.key;
    } else {
      return 'err';
    }
  }),
);

const keycodeWithPluck$ = keyup$.pipe(pluck('code'));

const pressed$ = keyup$.pipe(mapTo('Key Pressed'));

keycode$.subscribe(console.log);

keycodeWithPluck$.subscribe(console.log);

pressed$.subscribe(console.log);
