import { CanActivateFn, Router } from '@angular/router';
import { TokenManagerService } from '../services/token-manager.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const oauthService: TokenManagerService = inject(TokenManagerService);
  const router: Router = inject(Router);
  if(!oauthService.isLoggedIn){
    router.navigate([`/login`]);
  }
  return true;
};
