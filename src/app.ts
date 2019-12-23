import { range, of } from 'rxjs';

const observer = {
  next: (val: any) => console.log('next', val),
  error: (val: any) => console.log('error', val),
  complete: () => console.log('complete'),
};

const source$ = of(1, 2, 3, 4, 5);

source$.subscribe(observer);

const anotherSource$ = range(1, 5);

anotherSource$.subscribe(observer);
