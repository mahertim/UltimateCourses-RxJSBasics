import { fromEvent, asyncScheduler } from 'rxjs';
import { map, tap, throttleTime } from 'rxjs/operators';

// helpers
function calculateScrollPercent(element: {
  scrollTop: any;
  scrollHeight: any;
  clientHeight: any;
}) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// elements
const progressBar = document.querySelector('.progress-bar') as HTMLElement;

// streams
const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
  throttleTime(30, asyncScheduler, {
    leading: false,
    trailing: true,
  }),
  map(({ target }: any) => calculateScrollPercent(target.documentElement)),
  tap(console.log),
);

progress$.subscribe(percent => {
  progressBar.style.width = `${percent}%`;
});
