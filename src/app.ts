import { interval } from 'rxjs';
import { scan, mapTo, filter } from 'rxjs/operators';

// elements
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

const counter$ = interval(1000);

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    filter(value => value >= 0),
  )
  .subscribe(value => {
    console.log(value);
    if (countdown instanceof HTMLElement) {
      countdown.innerHTML = value.toString();
    }
    if (!value && message instanceof HTMLElement) {
      message.innerHTML = 'Liftoff!';
    }
  });
