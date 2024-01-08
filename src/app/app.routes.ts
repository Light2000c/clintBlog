import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { BlogsComponent } from './admin/blogs/blogs.component';
import { AddBlogComponent } from './admin/add-blog/add-blog.component';
import { CategoryComponent } from './admin/category/category.component';
import { AccountComponent } from './admin/account/account.component';
import { TeamMemberComponent } from './admin/team-member/team-member.component';
import { NewsComponent } from './pages/news/news.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './providers/auth/auth.guard';
import { EditPostComponent } from './admin/edit-post/edit-post.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';

export const routes: Routes = [
{
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
},
{
    path: 'news',
    component: NewsComponent,
},
{
    path: 'about',
    component: AboutComponent,
},
{
    path: 'contact',
    component: ContactComponent,
},
{
    path: 'login',
    component: LoginComponent,
},
{
    path: 'news/:id',
    component: BlogDetailsComponent,
},
// {
//     path: 'register',
//     component: RegisterComponent,
// },
{
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
},
{
    path: 'admin/blog',
    component: BlogsComponent,
    canActivate: [AuthGuard],
},
{
    path: 'admin/blog/:id',
    component: EditPostComponent,
    canActivate: [AuthGuard],
},
{
    path: 'admin/add-blog-post',
    component: AddBlogComponent,
},
{
    path: 'admin/category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
},
{
    path: 'admin/accounts',
    component: AccountComponent,
    canActivate: [AuthGuard],
},
{
    path: 'admin/team-members',
    component: TeamMemberComponent,
    canActivate: [AuthGuard],
},

];
