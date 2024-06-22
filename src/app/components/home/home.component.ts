import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/PostInterface';
import { Store, select } from '@ngrx/store';
import { selectUserId } from '../../states/user.selectors';
import { UserState } from '../../states/user.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: string = "";
  allPublicPosts: Post[] = [];

  constructor(
    private postService: PostService,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUserId)).subscribe(userId => {
      this.userId = userId!;
      // Fetch user profile when userId is available
      if (this.userId) {
        this.postService.getAllPublicPost(this.userId).subscribe(
          (response: any) => {
            console.log("All Public Response");
            console.log(response);
            if (response.message === "No Posts") {
            } else {
              this.allPublicPosts = response.allPublicPosts.map((post: Post) => ({
                ...post,
                date: this.formatDate(post.date), // Format date to remove time part
                image: this.convertToImageSrc(post.image) // Convert image data if available
              }));
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
