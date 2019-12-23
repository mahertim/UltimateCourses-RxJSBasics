import { Observable, fromEvent } from 'rxjs';

const source$: Observable<Event> = fromEvent(document, 'keyup');

const observer = {
  next: (val: Event) => console.log('next', val),
  error: (val: Event) => console.log('error', val),
  complete: () => console.log('complete'),
};

const subOne = source$.subscribe(observer);
const subTwo = source$.subscribe(observer);

setTimeout(() => {
  console.log('unsubscribing');
  subOne.unsubscribe();
}, 3000);

console.log(subTwo);
