import { fromEvent } from 'rxjs';
import { map, first } from 'rxjs/operators';

const click$ = fromEvent(document, 'click');

click$
  .pipe(
    map(event => {
      if (event instanceof MouseEvent) {
        return {
          x: event.clientX,
          y: event.clientY,
        };
      }
      return {
        x: 0,
        y: 0,
      };
    }),
    // filter, take(1)
    first(({ y }) => y > 200),
  )
  .subscribe({
    next: console.log,
    complete: () => console.log('complete'),
  });
