import { Observable } from 'rxjs';

const observer = {
  next: (value: any) => console.log('next', value),
  error: (error: any) => console.log('error', error),
  complete: () => console.log('complete!'),
};

const observable = new Observable((subscriber: any) => {
  let count = 0;

  const id = setInterval(() => {
    subscriber.next(count);
    count++;
  }, 1000);

  return () => {
    console.log('called');
    clearInterval(id);
  };
});

console.log('before');
const subscription = observable.subscribe(observer);
const subscription2 = observable.subscribe(observer);
console.log('after');

subscription.add(subscription2); // allows us to unsubscribe both at once
setTimeout(() => {
  // calls the cleanup method we returned from subscribe method
  // does not fire complete()
  subscription.unsubscribe();
}, 3500);
