import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/PostInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: string = "";
  allPublicPosts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPublicPost().subscribe(
      (response: any) => {
        console.log("All Public Response");
        console.log(response);
        if (response.message === "No Posts") {
          alert("No posts yet");
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
