import { Observable, of, fromEvent } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
import { delay, concatMap } from 'rxjs/operators';

// helpers
const saveAnswer = (answer: string): Observable<string> => {
  // simulate delayed request
  return of(`Saved: ${answer}`).pipe(delay(1500));
};

// elements
const radioButtons = document.querySelectorAll('.radio-option');

// streams
const answerChange$ = fromEvent(radioButtons, 'click');

answerChange$
  .pipe(
    concatMap(event => saveAnswer((event.target as HTMLInputElement).value)),
  )
  .subscribe(console.log);
