import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../interface/PostInterface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userId: string="";
  allPublicPosts:Post[]=[];

  constructor(
      private postService:PostService,
  ){}
  ngOnInit(): void {
    this.postService.getAllPublicPost().subscribe(
      (response: any) => {
        console.log("All Public Response");
        console.log(response);
        if(response.message === "No Posts"){
          alert("Mo posts yet")
        }
        else{
          this.allPublicPosts=response.allPublicPosts;
        }
        
      },
      error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    );
  }

  
}
