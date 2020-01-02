import { combineLatest, fromEvent, of } from 'rxjs';
import { map, filter, delay, mergeMap, tap, share } from 'rxjs/operators';
import { calculateMortgage } from './helpers';

// elements
const loanAmount = document.getElementById('loanAmount') as HTMLInputElement;
const interest = document.getElementById('interest') as HTMLInputElement;
const loanLength = document.querySelectorAll('.loanLength') as NodeListOf<
  HTMLInputElement
>;
const expected = document.getElementById('expected') as HTMLElement;

// helpers
const createInputValueStream = (
  elem: HTMLInputElement | NodeListOf<HTMLInputElement>,
) => {
  return fromEvent(elem, 'input').pipe(
    map(event =>
      parseFloat(((event as KeyboardEvent).target as HTMLInputElement).value),
    ),
  );
};

const saveResponse = (mortgageAmount: string) => {
  // simulate sending to logging server
  return of(mortgageAmount).pipe(delay(1000));
};

// streams
const interest$ = createInputValueStream(interest);
const loanLength$ = createInputValueStream(loanLength);
const loanAmount$ = createInputValueStream(loanAmount);

const calculation$ = combineLatest(interest$, loanAmount$, loanLength$).pipe(
  map(([interest, loanAmount, loanLength]) => {
    return calculateMortgage(interest, loanAmount, loanLength);
  }),
  tap(console.log), // prove calculation only happens once
  filter(mortgageAmount => !isNaN(parseFloat(mortgageAmount))),
  share(),
);

calculation$.subscribe(mortgageAmount => (expected.innerHTML = mortgageAmount));

calculation$
  .pipe(mergeMap(mortgageAmount => saveResponse(mortgageAmount)))
  .subscribe();
