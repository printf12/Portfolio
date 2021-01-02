import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule}   from '@angular/forms';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { PortfolioViewComponent } from './portfolio-view/portfolio-view.component';
import { CreateNewPortfolioComponent } from './Administration/create-new-portfolio/create-new-portfolio.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    BlogComponent,
    ContactComponent,
    PortfolioComponent,
    BlogViewComponent,
    PortfolioViewComponent,
    CreateNewPortfolioComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
