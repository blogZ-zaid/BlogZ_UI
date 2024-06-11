import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { CustomValidators } from '../../validations/CustomValidator';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import { setUserId } from '../../states/user.actions';
import { Store } from '@ngrx/store';
import { UserState } from '../../states/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm=new FormGroup({
    email: new FormControl('', [
           Validators.required,
           Validators.email
    ]),
    password: new FormControl('', [
              Validators.required,
    ]),
});

constructor(
  private router: Router,
  private loginService:LoginService,
  private authService: AuthService,
  private store: Store<UserState>
) {}

ngOnInit(): void {}

get email(){
  return this.loginForm.get('email')
}

get password(){
  return this.loginForm.get('password')
}

submit(): void {
  if (this.loginForm.valid) {
    const userData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginService.login(userData).subscribe(
      (response:any) => {
        if (response.message === "Incorrect password") {
          alert("Invalid Credentials");
        } else if (response.message === "User not found") {
          alert("User does not exist");
        } else if (response.userData) {
          this.authService.login();

          // Dispatch setUserId action with user ID
          const userId = response.userData._id; // Assuming the user ID is in response.userData.id
          this.store.dispatch(setUserId({ userId }));

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
