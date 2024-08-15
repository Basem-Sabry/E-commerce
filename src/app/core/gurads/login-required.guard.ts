import { CanActivateFn,Router  } from '@angular/router';
import { inject } from '@angular/core';

export const loginRequiredGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const checkIfUserLoggedIn : string = JSON.parse(localStorage.getItem('user') as string)
  if (checkIfUserLoggedIn) {
    return true;
  }
  else {
    return router.createUrlTree(['']);

  }

};
