import { Injectable, ViewChild } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';


export interface Blog {
  id: string;
  title: string,
  category: string,
  image: string,
  description: string,
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public baseUrl: string = "http://clintblog.com.ng/api/";
  public blogPosts: Blog[] = [];
  public categories: any[] = [];
  public teamMembers: any[] = [];
  public blogPostsLoaded: boolean = false;
  public blogPost!: Blog;
  public categoriesLoaded: boolean = false;
  public teamMembersLoaded: boolean = false;
  public tableCounts: any;



  constructor(
    public auth: AuthProvider,
    public service: HttpService
  ) {
    this.auth.setUser();
  }

  ngOnInit() {
  }

  public setHeader() {
    // console.log("Token ==> ", this.auth.user.token);
    let header = new HttpHeaders({
      "Accept": "*/*",
      "Authorization": `Bearer ${this.auth.user.token}`,
    });

    return header;
  }


  public getBlogPosts() {
    return this.blogPosts;
  }

  public getCategories() {
    return this.categories;
  }

  public getTeamMembers() {
    return this.teamMembers;
  }
   
  public getTableCount() {
    return this.tableCounts;
  }

  public async fetchTableCount(){
    const response = await this.service.getRequest(this.baseUrl +'/table_count', {headers: {contentType : 'application/json'}});

    console.log("response ==> ", response);

    if((response as any).status == "success"){

      this.tableCounts = (response as any).data;
    }
  }

  public async fetchPost(endpoint: string, postId: any) {
    const response = await this.service.getRequest(this.baseUrl + endpoint + `/${postId}`, { headers: this.setHeader() });

    // console.log("response ==> ", response);
    if ((response as any).status == 'success') {

      this.blogPost = (response as any).data[0];
    }
  }

  public async fetchBlogPosts(endpoint: string) {
    const response = await this.service.getRequest(this.baseUrl + endpoint, { headers: this.setHeader() });

    // console.log("response ==> ", response);
    if ((response as any).status == 'success') {
      this.blogPostsLoaded = true;
      this.blogPosts = (response as any).data;
    }
  }



  public async addPost(endpoint: string, param: any) {

    const response: any = await this.service.postRequest(this.baseUrl + endpoint, param, { headers: this.setHeader() });
    // console.log("Response ==> ", response);


    if (response.status) {
      if (["invalid_token", "access_denied"].includes(response.status)) {
        return this.auth.signOut();
      } else {
        return { status: response.status }
      }
    } else {
      return { status: 'fail' }
    }
  }

  public async updatePost(endpoint: string, body: any) {

    const response: any = await this.service.putRequest(this.baseUrl + endpoint, body, { headers: this.setHeader() });

    // console.log("Response ==>", response);

    if (response.status) {
      // console.log("Response ==> ", response);
      if (["invalid_token", "access_denied"].includes(response.status)) {
        return this.auth.signOut();
      } else {
        return { status: response.status }
      }
    } else {
      return { status: 'fail' }
    }
  }



  public async deletePost(endpoint: string, id: any) {

    const options = {
      headers: this.setHeader(),
      body: { id: id },
    }
    const response = await this.service.deleteRequest(this.baseUrl + endpoint, options);

    // console.log("Response =>", response);

    if ((response as any).status) {
      if (["invalid_token", "access_denied"].includes((response as any).status)) {
        return this.auth.signOut();
      } else {
        return { status: (response as any).status }
      }
    } else {
      return { status: "fail" }
    }

  }

  public async fetchCategories(endpoint: string) {

    const response = await this.service.getRequest(this.baseUrl + endpoint, { headers: this.setHeader() });

    // console.log("Response ==> ", response);

    if ((response as any).status && (response as any).status == "success") {
      this.categories = (response as any).data;
    }
  }


  public async addCategory(endpoint: string, body: any) {

    const response = await this.service.postRequest(this.baseUrl + endpoint, body, { headers: this.setHeader() });
    // console.log("response is ==> ", response);

    if ((response as any).status) {
      if (["invalid_token", "access_denied"].includes((response as any).status)) {
        return this.auth.signOut();
      } else {
        return { status: (response as any).status }
      }
    } else {
      return { status: "fail" };
    }

  }

  public async deleteCatgeory(endpoint: string, id: any) {

    const options = {
      headers: this.setHeader(),
      body: { id: id },
    }
    const response = await this.service.deleteRequest(this.baseUrl + endpoint, options);

    // console.log("Response =>", response);

    if ((response as any).status) {
      if (["invalid_token", "access_denied"].includes((response as any).status)) {
        return this.auth.signOut();
      } else {
        return { status: (response as any).status }
      }
    } else {
      return { status: "fail" }
    }

  }

  public async fetchTeamMembers(endpoint: string) {

    const response = await this.service.getRequest(this.baseUrl + endpoint, { headers: this.setHeader });

    // console.log("response ==>", response);
    if ((response as any).status && (response as any).status == "success") {

      this.teamMembers = (response as any).data;
      this.teamMembersLoaded = true;
    }

  }


  public async addTeamMember(endpoint: string, body: any) {

    const response = await this.service.postRequest(this.baseUrl + endpoint, body, { headers: this.setHeader() });

    // console.log("Response ==> ", response);

    if ((response as any).status) {
      if (["invalid_token", "access_denied"].includes((response as any).status)) {
        return this.auth.signOut();
      } else {
        return { status: (response as any).status }
      }
    } else {
      return { status: 'fail' };
    }
  }


  public async updatePassword(endpoint: string, body: any) {

    const response = await this.service.putRequest(this.baseUrl + endpoint, body, {headers: this.setHeader()});

    // console.log("Response ==> ", response);

    if ((response as any).status) {
      if (["invalid_token", "access_denied"].includes((response as any).status)) {
        return this.auth.signOut();
      } else {
        return response;
      }
    } else {
      return { status: 'fail' };
    }
  }

  public async deleteTeamMember(endpoint: string, id: any) {
    const options = {
      headers: this.setHeader(),
      body: { id: id },
    }
    const response = await this.service.deleteRequest(this.baseUrl + endpoint, options);

    // console.log("Response =>", response);

    if ((response as any).status) {
      if (["invalid_token", "access_denied"].includes((response as any).status)) {
        return this.auth.signOut();
      } else {
        return { status: (response as any).status }
      }
    } else {
      return { status: "fail" }
    }
  }


}
