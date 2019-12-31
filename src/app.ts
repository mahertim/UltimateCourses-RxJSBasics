import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';

// elements
const inputBox = document.getElementById('text-input') as HTMLElement;

// streams
// const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup');

input$
  // debounceTime(1000) is the same as debounce( () => interval(1000) )
  .pipe(debounceTime(1000), pluck('target', 'value'), distinctUntilChanged())
  .subscribe(console.log);
