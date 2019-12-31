import { Observable, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const numbers$: Observable<number> = of(1, 1, 2, 2, 2, 3, 3, 4, 5, 5, 3);

numbers$
  .pipe(
    // uses === by default
    distinctUntilChanged(),
  )
  .subscribe(console.log);
