import { from } from 'rxjs';
import { scan, map } from 'rxjs/operators';

// const numbers = [1, 2, 3, 4, 5];
class User {
  constructor(
    public name: string = '',
    public loggedIn: boolean = false,
    public token: string | null = null,
  ) {}
}

const users = [
  new User('Richard', false, null),
  new User('Gilfoil', true, 'abc'),
  new User('Jared', true, '123'),
];

const state$ = from(users).pipe(
  scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  }, new User()),
);

const name$ = state$.pipe(map(user => user.name));

name$.subscribe(console.log);
