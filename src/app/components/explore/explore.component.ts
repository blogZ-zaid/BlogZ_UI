import { Component, OnInit } from '@angular/core';
import { selectUserId } from '../../states/user.selectors';
import { UserState } from '../../states/user.state';
import { Store, select } from '@ngrx/store';
import { ExploreService } from '../../services/explore.service';
import { User } from '../../interface/UserInterface';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit{
  userId: string="";
  allUsers:User[]=[];

  constructor(
    private store: Store<UserState>,
    private exploreService:ExploreService
  )
  {}
  
  ngOnInit(): void {
    this.store.pipe(select(selectUserId)).subscribe(userId => {
      this.userId = userId!;
    });

    this.exploreService.getAllUsers(this.userId).subscribe(
      (response: any) => {
        console.log("All Public Response");
        console.log(response);
        if(response.message === "No People found to follow"){
          alert("No People found to follow")
        }
        else{
          this.allUsers=response.allUsersExceptOwn;
        }
        
      },
      error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    );

  }

  followUser(user: any): void {
    console.log('Follow user:', user);
    let followRequestData={
        userId:this.userId,
        followUserId:user.id,
        followUserName:user.fullName
    }
    this.exploreService.sendFollowRequest(followRequestData).subscribe(
      (response: any) => {
        console.log("Follow Request Response");
        console.log(response);
        if(response.message === "User not found"){
          alert("User not found")
        }
        else{
           console.log("Follow request sent successfully");
        }
        
      },
      error => {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    );
  }

}
