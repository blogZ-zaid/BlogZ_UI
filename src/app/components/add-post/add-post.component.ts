import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserState } from '../../states/user.state';
import { Store, select } from '@ngrx/store';
import { selectUserId, selectfullName } from '../../states/user.selectors';

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

  userId: string = "";
  fullName:string="";
  selectedFile: File | null = null;
  previewUrl: any = null;

  constructor(
    private router: Router,
    private postService: PostService,
    private store: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUserId)).subscribe(userId => {
      this.userId = userId!;
    });
    this.store.pipe(select(selectfullName)).subscribe(fullname => {
      this.fullName = fullname!;
    });

    console.log("UserId",this.userId)
    console.log("FullName",this.fullName)
  }

  get title() {
    return this.addPostForm.get('title');
  }

  get description() {
    return this.addPostForm.get('description');
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];
      this.preview();
    }
  }

  preview() {
    const mimeType = this.selectedFile?.type;
    if (!mimeType?.startsWith('image/')) {
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile!);
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
  }

  submit(): void {
    if (this.addPostForm.valid) {
      const userData = {
        title: this.addPostForm.value.title,
        description: this.addPostForm.value.description,
        privacy: this.addPostForm.value.privacy, // Change visibility to privacy in the submitted data
        userId: this.userId ,
        fullName:this.fullName
      };

      const formData = new FormData();
      formData.append('title', userData.title!);
      formData.append('description', userData.description!);
      formData.append('privacy', userData.privacy!);
      formData.append('userId', userData.userId);
      formData.append('fullName', userData.fullName);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.postService.addPost(formData).subscribe(
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
