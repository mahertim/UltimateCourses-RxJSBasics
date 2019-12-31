import { interval } from 'rxjs';
import { sampleTime, throttleTime, debounceTime } from 'rxjs/operators';

// elements
const timer = document.getElementById('timer') as HTMLElement;
const debouncer = document.getElementById('debouncer') as HTMLElement;
const throttler = document.getElementById('throttler') as HTMLElement;
const sampler = document.getElementById('sampler') as HTMLElement;

// streams
const timer$ = interval(1000);
const debouncer$ = timer$.pipe(debounceTime(500));
const throttler$ = timer$.pipe(throttleTime(2000));
const sampler$ = timer$.pipe(sampleTime(2000));

timer$.subscribe(tick => {
  timer.innerHTML = `Timer: ${tick}`;
});
debouncer$.subscribe(tick => {
  debouncer.innerHTML = `Debouncer: ${tick}`;
});
throttler$.subscribe(tick => {
  throttler.innerHTML = `Throttler: ${tick}`;
});
sampler$.subscribe(tick => {
  sampler.innerHTML = `Sampler: ${tick}`;
});
