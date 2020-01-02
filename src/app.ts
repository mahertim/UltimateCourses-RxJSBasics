import { Observable, fromEvent } from 'rxjs';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { exhaustMap } from 'rxjs/operators';

// helpers
const authenticateUser = (): Observable<AjaxRequest> => {
  return ajax.post('https://regres.in/api/login', {
    email: 'eve.holt@regres.in',
    password: 'password',
  });
};

// elements
const loginButton = document.getElementById('login') as HTMLButtonElement;

// streams
const login$ = fromEvent(loginButton, 'click') as Observable<MouseEvent>;

login$.pipe(exhaustMap(() => authenticateUser())).subscribe(console.log);
