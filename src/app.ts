import { Observable, from } from 'rxjs';

const observer = {
  next: (val: any): void => console.log('next', val),
  error: (val: any): void => console.log('error', val),
  complete: (): void => console.log('complete'),
};

function* hello() {
  yield 'hello';
  yield 'world';
}
const iterator = hello();
const iteratorSource$ = from(iterator);
iteratorSource$.subscribe(observer);
console.log('----------');

const arraySource$: Observable<number> = from([1, 2, 3, 4, 5]);
arraySource$.subscribe(observer);
console.log('----------');

const stringSource$: Observable<string> = from('hello');
stringSource$.subscribe(observer);
console.log('----------');

const promiseSource$: Observable<Response> = from(
  fetch('https://api.github.com/users/octocat'),
);
promiseSource$.subscribe(observer);
