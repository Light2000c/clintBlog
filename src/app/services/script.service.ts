import { DOCUMENT } from '@angular/common';
import { Injectable, Inject, NgZone, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  routerSubscription: any;

  constructor(
    public route: Router,
    public zone: NgZone,
    // public renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
  }


  init(render?: string): void {
    console.log("display ==> ", render);
    let scriptUrls: string[];
    if (render === "admin") {
      scriptUrls = [
        "assets/web/app-assets/vendors/js/vendors.min.js",
        "assets/web/app-assets/vendors/js/tables/datatable/datatables.min.js",
        "assets/web/app-assets/vendors/js/charts/apexcharts/apexcharts.min.js",
        "assets/web/app-assets/js/core/app-menu.min.js",
        "assets/web/app-assets/js/core/app.min.js",
        "assets/web/app-assets/js/scripts/customizer.min.js",
        "assets/web/app-assets/js/scripts/footer.min.js",
        "assets/web/app-assets/js/scripts/pages/crypto-trading.min.js",
      ];
    } else {
      scriptUrls = [
        "/assets/web/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
        "/assets/web/assets/vendor/swiper/swiper-bundle.min.js",
        "/assets/web/assets/vendor/glightbox/js/glightbox.min.js",
        "/assets/web/assets/vendor/aos/aos.js",
        "/assets/web/assets/vendor/php-email-form/validate.js",
        "/assets/web/assets/js/main.js"
      ];
    }

    this.loadScripts(scriptUrls)
      .then(() => {
        console.log('Scripts loaded successfully');
      })
      .catch(error => {
        console.error('Error loading scripts:', error);
      });
  }


  loadScripts(scriptUrls: string[]): Promise<void[]> {
    const loadPromises: Promise<void>[] = [];

    scriptUrls.forEach(url => {
      const script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = true;
      script.defer = true;

      const promise = new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
      });

      this.document.body.appendChild(script);
      loadPromises.push(promise);
    });

    return Promise.all(loadPromises);
  }


//  async init(render?: string) {
//     console.log("display ==> ", render);
//     if (render === "admin") {
//       this.loadScripts([
//       "assets/web/app-assets/vendors/js/vendors.min.js",
//       "assets/web/app-assets/vendors/js/tables/datatable/datatables.min.js",
//       "assets/web/app-assets/vendors/js/charts/apexcharts/apexcharts.min.js",
//       "assets/web/app-assets/js/core/app-menu.min.js",
//       "assets/web/app-assets/js/core/app.min.js",
//       "assets/web/app-assets/js/scripts/customizer.min.js",
//       "assets/web/app-assets/js/scripts/footer.min.js",
//       "assets/web/app-assets/js/scripts/pages/crypto-trading.min.js",
//       ]);
//     } else {
//       this.loadScripts([
//         "/assets/web/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
//         "/assets/web/assets/vendor/swiper/swiper-bundle.min.js",
//         "/assets/web/assets/vendor/glightbox/js/glightbox.min.js",
//         "/assets/web/assets/vendor/aos/aos.js",
//         "/assets/web/assets/vendor/php-email-form/validate.js",
//         "/assets/web/assets/js/main.js"
//       ]);
//     }
//   }


  // private loadScripts(scriptUrls: string[]) {
  //   scriptUrls.forEach(url => {
  //     const script = this.document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = url;
  //     script.async = true;
  //     script.defer = true;
  //     this.document.body.appendChild(script);
  //   });
  // }

}
