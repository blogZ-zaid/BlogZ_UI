import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from '../../states/user.state';
import { selectUserProfile } from '../../states/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = 'Username';
  postsCount: number = 0;
  followersCount: number = 0;
  followingCount: number = 0;
  posts: any[] = [];
  fullName: string | null = '';
  email: string | null = '';
  phoneNumber: string | null = '';

  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUserProfile)).subscribe(profile => {
      if (profile) {
        console.log("Profile",profile);
        this.fullName = profile.fullName;
        this.email = profile.email;
        this.phoneNumber = profile.phoneNumber;
        // Assume that posts, followersCount, and followingCount are part of the user profile
        this.posts = []; // Update this with actual data fetching logic
        this.postsCount = this.posts.length;
        this.followersCount = 0; // Update this with actual data fetching logic
        this.followingCount = 0; // Update this with actual data fetching logic
      }
    });
  }
}
