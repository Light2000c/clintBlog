import { Injectable, NgZone } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";


Injectable({
    providedIn: 'root',
})

class AssetProvider{

    routerSubscription: any;

    constructor(
      public route: Router,
      public zone: NgZone
    ){
  
    }
  
    ngOnInit() {
      this.recallJsFuntions();
        }
      
        recallJsFuntions() {
          this.routerSubscription = this.route.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(event => {
              this.loadJQueryScripts();
            });
        }

        public loadJQueryScripts() {
          const scriptUrls = [
            "/assets/web/assets/css/main.css",
            "/assets/web/assets/css/variables.css",
            "/assets/web/assets/vendor/aos/aos.css",
            "/assets/web/assets/vendor/glightbox/css/glightbox.min.css",
            "/assets/web/assets/vendor/swiper/swiper-bundle.min.css",
            "/assets/web/assets/vendor/bootstrap-icons/bootstrap-icons.css",
            "/assets/web/assets/vendor/bootstrap/css/bootstrap.min.css",
            "/assets/web/assets/img/apple-touch-icon.png",
            "/assets/web/assets/img/favicon.png",
            "/assets/web/assets/js/main.js",
            "/assets/web/assets/vendor/php-email-form/validate.js",
            "/assets/web/assets/vendor/aos/aos.js",
            "/assets/web/assets/vendor/glightbox/js/glightbox.min.js",
            "/assets/web/assets/vendor/swiper/swiper-bundle.min.js",
            "/assets/web/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
          ];
      
          scriptUrls.forEach(url => {
            this.loadScripts(url)
          });
        }
      
        public loadScripts(url: string) {
          const script = document.createElement('script');
          script.src = url;
          script.async = false; // Load script synchronously
          script.onload = () => {
            this.zone.run(() => {
              // Code to run after script is loaded (if needed)
            });
          };
          document.head.appendChild(script);
        }
      
        
        ngOnDestroy() {
          this.routerSubscription.unsubscribe();
        }
}