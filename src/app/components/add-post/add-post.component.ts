import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserState } from '../../states/user.state';
import { Store, select } from '@ngrx/store';
import { selectUserId } from '../../states/user.selectors';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    privacy: new FormControl('everyone') // Change visibility to privacy with default value
  });

  constructor(
    private router: Router,
    private postService: PostService,
    private store: Store<UserState>
  ) {}

  userId: string="";

  ngOnInit(): void {
    this.store.pipe(select(selectUserId)).subscribe(userId => {
      this.userId = userId!;
    });
  }

  get title() {
    return this.addPostForm.get('title');
  }

  get description() {
    return this.addPostForm.get('description');
  }

  submit(): void {
    if (this.addPostForm.valid) {
      const userData = {
        title: this.addPostForm.value.title,
        description: this.addPostForm.value.description,
        privacy: this.addPostForm.value.privacy, // Change visibility to privacy in the submitted data
        userId: this.userId 
      };

      this.postService.addPost(userData).subscribe(
        (response: any) => {
          console.log("Note Added Response");
          console.log(response);
          if (response.message === "Note saved successfully") {
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.error('Error:', error);
          alert('Something went wrong. Please try again.');
        }
      );
    }
  }

}
