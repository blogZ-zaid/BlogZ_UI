import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState } from '../../states/user.state';
import { selectUserId } from '../../states/user.selectors';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: string = "";
  userProfile: any;
  posts: any[] = []; // Property to hold the posts

  constructor(
    private store: Store<UserState>,
    private profilesService: ProfileService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUserId)).subscribe(userId => {
      this.userId = userId!;
      // Fetch user profile when userId is available
      if (this.userId) {
        this.profilesService.getUserProfile(this.userId).subscribe(
          (response: any) => {
            console.log("User Profile");
            if (response.message === "User Not Found") {
              alert("User Not Found");
            } else {
              this.userProfile = response.userObj;
              this.posts = this.userProfile.posts.map((post: any) => ({
                ...post,
                date: this.formatDate(post.date), // Format date to remove time part
                image: this.convertToImageSrc(post.image) // Convert image data if available
              }));
              console.log(this.userProfile);
            }
          },
          error => {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
          }
        );
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  // Function to convert base64 image data to a usable src format
  convertToImageSrc(imageData: string | undefined): string | undefined {
    if (!imageData) return undefined;
    return `data:image/jpeg;base64,${imageData}`;
    // Adjust 'image/jpeg' to the appropriate MIME type based on your backend data
  }
}
