import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupService } from './services/signup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostService } from './services/post.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from './components/header/header.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './components/auth.guard';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './states/user.reducer';
import { ExploreComponent } from './components/explore/explore.component';
import { ExploreService } from './services/explore.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AddPostComponent,
    HeaderComponent,
    LogoutComponent,
    ProfileComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    StoreModule.forRoot({ user: userReducer })
  ],
  providers: [
    SignupService,
    LoginService,
    PostService,
    AuthService,
    AuthGuard,
    ExploreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
