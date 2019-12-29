import { Observable, timer } from 'rxjs';

const timer$: Observable<number> = timer(2000, 1000);

timer$.subscribe(console.log);
