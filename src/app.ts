import { fromEvent, combineLatest, interval } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';

// helpers
const keyupAsValue = (elem: HTMLInputElement) => {
  return fromEvent(elem, 'keyup').pipe(
    map(
      (event: KeyboardEvent) =>
        (event.target as HTMLInputElement).valueAsNumber,
    ),
  );
};

// elements
const first = document.getElementById('first') as HTMLInputElement;
const second = document.getElementById('second') as HTMLInputElement;

// streams
const click$ = fromEvent(document, 'click');

click$.pipe(withLatestFrom(interval(1000))).subscribe(console.log);

combineLatest(keyupAsValue(first), keyupAsValue(second))
  .pipe(
    filter(([first, second]) => {
      return !isNaN(first) && !isNaN(second);
    }),
    map(([first, second]) => {
      return first + second;
    }),
  )
  .subscribe(console.log);
