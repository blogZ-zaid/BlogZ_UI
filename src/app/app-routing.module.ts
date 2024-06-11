import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './components/auth.guard';

const routes: Routes = [
   {path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect the empty path to the login page
   {path:'signup',component:SignupComponent},
   {path:'login',component:LoginComponent},
   {path:'home',component:HomeComponent,canActivate: [AuthGuard]},
   {path:'addPost',component:AddPostComponent,canActivate: [AuthGuard]},
   {path:'profile',component:ProfileComponent,canActivate: [AuthGuard]},
   {path:'logout',component:LogoutComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
