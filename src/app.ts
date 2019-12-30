import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

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
const progressBar = document.querySelector('.progress-bar');

// streams
const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
  // percent progress
  map(({ target }: any) => calculateScrollPercent(target.documentElement)),
);

progress$.subscribe(percent => {
  if (progressBar instanceof HTMLElement) {
    console.log(percent);
    progressBar.style.width = `${percent}%`;
  }
});
