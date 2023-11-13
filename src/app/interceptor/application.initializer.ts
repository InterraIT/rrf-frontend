import { TokenManagerService } from "../services/token-manager.service";

export const applicationInitializer = (authenticationService: TokenManagerService)=> {
    return () => new Promise((resolve:any) => {
        authenticationService.callRefreshTokenAPI(true).subscribe((response: any) => {
            authenticationService.refreshCacheDataSuccess(true, response);
        }, (error: any) => {
            authenticationService.refreshCacheDataError();
        }).add(resolve);
    });
}