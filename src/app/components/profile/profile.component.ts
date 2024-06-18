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
  userProfile:any;
  constructor(
      private store: Store<UserState>,
      private profilesService:ProfileService
    ) {}

  ngOnInit(): void {
    this.store.pipe(select(selectUserId)).subscribe(userId => {
      this.userId = userId!;
    });

    this.profilesService.getUserProfile(this.userId).subscribe(
      (response: any) => {
        console.log("User Profile");
        
        if(response.message === "User Not Found"){
          alert("User Not Found")
        }
        else{
          this.userProfile=response.userObj;
          console.log(this.userProfile);
        }
        
      },
      error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    )


  }
}
