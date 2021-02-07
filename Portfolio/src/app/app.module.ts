import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CreateBlogFormComponent } from './blog/create-blog-form/create-blog-form.component';
import { BlogViewDetailsComponent } from './blog/blog-view-details/blog-view-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CreatePortfolioFormComponent } from './portfolio/create-portfolio-form/create-portfolio-form.component';
import { ViewPortfolioDetailsComponent } from './portfolio/view-portfolio-details/view-portfolio-details.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProjectsHomeComponent } from './admin/admin-projects-home/admin-projects-home.component';
import { RouterModule } from '@angular/router';
import { AdminBlogsHomeComponent } from './admin/admin-blogs-home/admin-blogs-home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AudioComponent } from './audio/audio.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    BlogComponent,
    ContactComponent,
    PortfolioComponent,
    CreateBlogFormComponent,
    BlogViewDetailsComponent,
    PageNotFoundComponent,
    CreatePortfolioFormComponent,
    ViewPortfolioDetailsComponent,
    AdminComponent,
    AdminProjectsHomeComponent,
    AdminBlogsHomeComponent,
    GalleryComponent,
    AudioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
