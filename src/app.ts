import { fromEvent, empty } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  pluck,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs/operators';

const BASE_URL = 'https://api.openbrewerydb.org/breweries';
const typeaheadContainer = document.getElementById(
  'typeahead-container',
) as HTMLElement;

// elements
const inputBox = document.getElementById('text-input') as HTMLElement;

// streams
const input$ = fromEvent(inputBox, 'keyup');

input$
  .pipe(
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    switchMap(searchTerm =>
      ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`).pipe(
        catchError((_error, _caught) => {
          return empty();
        }),
      ),
    ),
  )
  .subscribe((response: any[]) => {
    typeaheadContainer.innerHTML = response.map(b => b.name).join('<br>');
  });
