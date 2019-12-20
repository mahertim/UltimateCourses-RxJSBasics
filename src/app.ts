import { Observable } from 'rxjs';

const observer = {
  next: (value: any) => console.log('next', value),
  error: (error: any) => console.log('error', error),
  complete: () => console.log('complete!'),
};

const observable = new Observable((subscriber: any) => {
  subscriber.next('hello');
  subscriber.next('world');
  subscriber.complete();
  subscriber.next('hello'); // not reached because the observable has completed
  subscriber.next('world'); // not reached because the observable has completed
});

console.log('before');
observable.subscribe(observer);
console.log('after');

console.log('before');
observable.subscribe((value: any) => console.log('next', value));
console.log('after');
