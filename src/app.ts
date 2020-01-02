import { fromEvent, merge } from 'rxjs';
// import { concat, startWith, delay } from 'rxjs/operators';

const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// keyup$.subscribe(console.log);
// click$.subscribe(console.log);

merge(keyup$, click$).subscribe(console.log);
