import { Injectable, NgModule } from "@angular/core";
import { HttpService } from "../../services/http/http.service";
import { HttpHeaders } from "@angular/common/http";
import { USER } from "../../models/user.model";
import { StorageService } from "../../services/storage/storage.service";
import { Router } from "@angular/router";



export interface SignIn {
    email: string,
    password: string
}

@Injectable({
    providedIn: 'root',
})

export class AuthProvider {

    public baseUrl: string = "http://clintblog.com.ng/api/";
    public user!: USER;

    constructor(
        public http: HttpService,
        public storage: StorageService,
        public router: Router
    ) { }


    public getHeader() {
        let header = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return header;
    }



    public async signIn(url: string, param: SignIn) {
        // console.log("data sent to request ==>", param);
        // console.log("sending data to ==> ", this.baseUrl + url);

        try {
            const response: any = await this.http.postRequest(this.baseUrl + url, param, { headers: this.getHeader });

            if (response.status) {
                if (response.status == "success") {
                    // console.log("response ==> ", response);
                    this.user = response.data;
                    this.saveUser(this.user);
                }
                return { status: response.status };
            } else {
                return { status: 'failed' };
            }
        } catch (err) {
            // console.log(err);
            return { status: 'failed' };
        }

    }

    public saveUser(user: USER) {
        if (user) {
            this.storage.set("userInfo", JSON.stringify(user));
        }
    }

    public setUser() {
        this.user = JSON.parse(this.storage.get("userInfo") || '{}');
        // console.log("active user ==> ", this.user);
    }

    public signOut(){
        this.storage.clear();
        this.router.navigate(['/login']);
    }

}