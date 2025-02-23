import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { CreateBlogFormComponent } from './blog/create-blog-form/create-blog-form.component';
import { BlogViewDetailsComponent } from './blog/blog-view-details/blog-view-details.component';
import{PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreatePortfolioFormComponent } from './portfolio/create-portfolio-form/create-portfolio-form.component';
import { ViewPortfolioDetailsComponent } from './portfolio/view-portfolio-details/view-portfolio-details.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProjectsHomeComponent } from './admin/admin-projects-home/admin-projects-home.component';
import { AdminBlogsHomeComponent } from './admin/admin-blogs-home/admin-blogs-home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AudioComponent } from './audio/audio.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminGalleryComponent } from './admin/admin-gallery/admin-gallery.component';
import { AdminAudioHomeComponent } from './admin/admin-audio-home/admin-audio-home.component';
import { AdminAlbumComponent } from './admin/admin-album/admin-album.component';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'blog', component: BlogComponent, pathMatch: 'full'},
  { path: 'createBlog', component: CreateBlogFormComponent,pathMatch: 'full'},
  { path: 'blogView/:id', component: BlogViewDetailsComponent,pathMatch: 'full'},
  { path: 'portfolioView/:id', component: ViewPortfolioDetailsComponent,pathMatch: 'full'},
  { path: 'portfolio', component: PortfolioComponent, pathMatch: 'full'},
  { path: 'createPortfolio', component: CreatePortfolioFormComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent,pathMatch: 'full' },
  { path: 'admin', component: AdminComponent,pathMatch: 'full' },
  { path: 'admin/gallery', component: AdminGalleryComponent,pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent,pathMatch: 'full' },
  { path: 'audio', component: AudioComponent,pathMatch: 'full' },
  { path: 'admin/projects', component: AdminProjectsHomeComponent,pathMatch: 'full' },
  { path: 'admin/blogs', component: AdminBlogsHomeComponent,pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent,pathMatch: 'full' },
  { path: 'admin/audio', component: AdminAudioHomeComponent,pathMatch: 'full' },
  { path: 'admin/albums', component: AdminAlbumComponent,pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent ,pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
