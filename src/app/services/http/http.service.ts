import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { GeneralModule } from '../../general/general.module';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) {
  }

  public getRequest(url: string, options: any) {
    const promise = new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((response: any) => {
        // console.log(response);
        resolve(response);
      }, (err) => {
        // console.log(err);
        reject(err);
      });
    });

    return promise;
  }

  public postRequest(url: string, body: any, options: any) {

    const promise = new Promise((resolve, reject) => {
      // console.log("data sent ==> ", body);
      // console.log("sending data to ==> ", url);
      this.http.post(url, body, options).subscribe((response: any) => {
        // console.log(response);
        resolve(response);
      }, (err) => {
        // console.log(err);
        reject(err);
      });
    });

    return promise;
  }

  public putRequest(url: string, body: any, options: any) {
    // console.log("data sent ==> ", body);
    // console.log("sending data to ==> ", url);
    const promise = new Promise((resolve, reject) => {
      this.http.put(url, body, options).subscribe((response: any) => {
        // console.log(response);
        resolve(response);
      }, (err) => {
        // console.log(err);
        reject(err);
      });
    });

    return promise;
  }

  public deleteRequest(url: string, options: any) {
    // console.log("options sent ==> ", options);
    // console.log("sending data to ==> ", url);
    const promise = new Promise((resolve, reject) => {
      this.http.delete(url, options).subscribe((response: any) => {
        // console.log(response);
        resolve(response);
      }, (err) => {
        // console.log(err);
        reject(err);
      });
    });
    return promise;
  }

  public check(url: string, body: any, options: any){
  return  this.http.post(url, body, options);
  }
}
