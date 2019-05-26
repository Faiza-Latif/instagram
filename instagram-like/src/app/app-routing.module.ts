import { RouteGuard } from './auth/route-guard';
import { FollowingComponent } from './following/following.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'allposts', component: AllPostsComponent, canActivate: [RouteGuard]},
  {path: 'myposts', component: MyPostsComponent, canActivate: [RouteGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [RouteGuard]},
  {path: 'following', component: FollowingComponent, canActivate: [RouteGuard]},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent}

]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{

}
