import { forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// helpers
const GITHUB_API_BASE = 'https://api.github.com';

// streams
const user$ = ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex`);
const repo$ = ajax.getJSON(`${GITHUB_API_BASE}/users/reactivex/repos`);

forkJoin(user$, repo$).subscribe(console.log);
