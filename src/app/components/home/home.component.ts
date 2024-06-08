import { Component } from '@angular/core';
import { LogoutService } from '../../services/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private logoutService: LogoutService, private router: Router) {}

  logout() {
    this.logoutService.logout().subscribe(
      response => {
        console.log(response);
        // Navigate to the login page or another appropriate page
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout error:', error);
      }
    );
  }
}
