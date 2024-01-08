import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class AuthGuard implements CanActivate {

    constructor(
        public router: Router
    ){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const isLocalStorageAvailable = typeof localStorage !== 'undefined';

        if (!isLocalStorageAvailable) {
          // Handle the case where localStorage is not available
          console.error('localStorage is not available in this environment.');
          return false; // or navigate to an error page
        }
        
        const isLoggedIn = localStorage.getItem("userInfo") !== null;

        if(!isLoggedIn){
            
            this.router.navigate(['/login']);
            return false;
        }else{
            return true;
        }

        // throw new Error("Method not implemented.");
    }
    

}