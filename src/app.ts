import { from } from 'rxjs';
import { scan, map, distinctUntilKeyChanged } from 'rxjs/operators';

class User {
  constructor(
    public name: string = '',
    public loggedIn: boolean = false,
    public token: string | null = null,
  ) {}
}

const user = [
  new User('Brian', false, null),
  new User('Brian', true, 'abc'),
  new User('Brian', true, '123'),
];

const state$ = from(user).pipe(
  scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  }, new User()),
);

const name$ = state$.pipe(
  distinctUntilKeyChanged('name'),
  map((state: any) => state.name),
);

name$.subscribe(console.log);
