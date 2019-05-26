import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FollowingComponent } from './following/following.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    FavoritesComponent,
    MyPostsComponent,
    SignUpComponent,
    LoginComponent,
    FollowingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
