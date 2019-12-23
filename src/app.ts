import { Observable, of, from, fromEvent, interval } from 'rxjs';

// create observable from a stream
const streamObs: Observable<String> = of('https://some.api.url/');

// create observable from an array
const arrayObs: Observable<number> = from([1, 2, 3, 4, 5]);

// create observable from dom event
const domObs: Observable<Event> = fromEvent(document, 'click');

// set up the emission of values at an interval
const intervalObs: Observable<number> = interval(1000);

console.log(streamObs);
console.log(arrayObs);
console.log(domObs);
console.log(intervalObs);
