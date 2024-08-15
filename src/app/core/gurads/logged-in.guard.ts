import { CanActivateFn,Router  } from '@angular/router';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const checkIfUserLoggedIn: string = JSON.parse(localStorage.getItem('user') as string)
  if (checkIfUserLoggedIn) {
    return router.createUrlTree(['/dashboard']);
  }
  else {
    return true;
  }

};
