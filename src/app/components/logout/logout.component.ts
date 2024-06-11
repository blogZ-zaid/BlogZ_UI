import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { clearUserId } from '../../states/user.actions';
import { UserState } from '../../states/user.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService,private store: Store<UserState>) {}

  ngOnInit(): void {
    this.authService.logout();
    this.store.dispatch(clearUserId());
    this.router.navigate(['/login']);
  }

}


    

