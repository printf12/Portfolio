import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { CreateNewPortfolioComponent } from './Administration/create-new-portfolio/create-new-portfolio.component';
import { ChatComponent } from './chat/chat.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'newPortfolio', component: CreateNewPortfolioComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
