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
    // Implement the follow user logic here
    console.log('Follow user:', user);
    // You can call a service method to handle the follow action
  }

}
