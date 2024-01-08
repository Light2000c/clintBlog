import { Injectable } from "@angular/core";
import { HttpService } from "../../services/http/http.service";
import { HttpHeaders } from "@angular/common/http";


@Injectable({
    providedIn: 'root',
})

export class DataProvider {
    public baseUrl: string = "http://localhost:3000/api/";
    public blogPost: any[] = [];
    public searchResult: any[] = [];
    public categories: any[] = [];
    public blogPostLoaded: boolean = false;
    public categoriesLoaded: boolean = false;

    constructor(
        public httpService: HttpService
    ) { }

    ngOnInit() {
    }

    public setHeader() {
        let header = new HttpHeaders({
            "Accept": "*/*",
        });

        return header;
    }


    public getPost() {
        return this.blogPost;
    }

    public getSearchedPost() {
        return this.searchResult;
    }

    public getCategories() {
        return this.categories;
    }

    public async fetchBlogPost(endpoint: string) {
        const response = await this.httpService.getRequest(this.baseUrl + endpoint, { headers: this.setHeader() });

        console.log("Response ==> ", response);

        if ((response as any).status == "success") {
            this.blogPost = (response as any).data;
            this.blogPostLoaded = true;
        }
    }

    public async fetchPostById(endpoint: string, id: string) {
        const response = await this.httpService.getRequest(this.baseUrl + endpoint + `/${id}`, { headers: this.setHeader() });

        console.log("Response ==> ", response);

        if ((response as any).status == "success") {
            return (response as any).data;
        }
    }


    public async fetchPostByCatgeory(endpoint: string, category: string) {
        const response = await this.httpService.getRequest(this.baseUrl + endpoint + `/category/${category}`, { headers: this.setHeader() });

        console.log("Response ==> ", response);

        if ((response as any).status == "success") {
            this.blogPost = (response as any).data;
            this.blogPostLoaded = true;
        }
    }

    public async fetchPostByKeyword(endpoint: string, keyword: string) {
        const param = { keyword: keyword }
        const response = await this.httpService.getRequest(this.baseUrl + endpoint + `/search/${keyword}`, { headers: this.setHeader() });

        console.log("Response ==> ", response);

        if ((response as any).status == "success") {
            this.searchResult = (response as any).data;
        }
    }


    public async fetchCategories(endpoint: string) {
        const response = await this.httpService.getRequest(this.baseUrl + endpoint, { headers: this.setHeader() });
        console.log("Response ==> ", response);

        if ((response as any).status == "success") {
            this.categories = (response as any).data;
            this.categoriesLoaded = true;
        }
    }

}