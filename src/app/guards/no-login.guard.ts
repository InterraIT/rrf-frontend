import { CanActivateFn, Router } from '@angular/router';
import { TokenManagerService } from '../services/token-manager.service';
import { inject } from '@angular/core';

export const noLoginGuard: CanActivateFn = (route, state) => {
  const oauthService: TokenManagerService = inject(TokenManagerService);
  const router: Router = inject(Router);
  if(oauthService.isLoggedIn){
    let landingPage = oauthService.getMyLandingPage();
    if(landingPage!=''){
      router.navigate([landingPage]);
    }
  }
  return true;
};
