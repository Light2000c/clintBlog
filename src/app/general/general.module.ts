import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostOneComponent } from '../components/post-one/post-one.component';
import { HeaderComponent } from '../components/header/header.component';
import { ScriptService } from '../services/script.service';
import { AdminHeaderComponent } from '../components/admin-header/admin-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from '../services/http/http.service';
import { AuthProvider } from '../providers/auth/auth';
import { StorageService } from '../services/storage/storage.service';
import { SubmitButtonComponent } from '../components/submit-button/submit-button.component';
import { DataService } from '../services/data/data.service';
import { RouterModule } from '@angular/router';
import { PostTwoComponent } from '../components/post-two/post-two.component';
import { PostThreeComponent } from '../components/post-three/post-three.component';
import { PostFourComponent } from '../components/post-four/post-four.component';
import { PostFiveComponent } from '../components/post-five/post-five.component';
import { PostSixComponent } from '../components/post-six/post-six.component';
import { DataProvider } from '../providers/data/data';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  imports: [
    CommonModule,
    HeaderComponent,
    PostOneComponent,
    AdminHeaderComponent, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SubmitButtonComponent,
    RouterModule,
    PostOneComponent,
    PostTwoComponent,
    PostThreeComponent,
    PostFourComponent,
    PostFiveComponent,
    PostSixComponent,
    NgxPaginationModule
  ],
  declarations: [],
  providers: [HttpClient, AuthProvider, HttpService, DataService, DataProvider],
  exports: [
    HeaderComponent,
     AdminHeaderComponent,
      PostOneComponent, 
      FormsModule, 
      ReactiveFormsModule, 
      HttpClientModule, 
      SubmitButtonComponent, 
      RouterModule,
      PostOneComponent,
      PostTwoComponent,
      PostThreeComponent,
      PostFourComponent,
      PostFiveComponent,
      PostSixComponent,
      NgxPaginationModule
    ],
})
export class GeneralModule { }
