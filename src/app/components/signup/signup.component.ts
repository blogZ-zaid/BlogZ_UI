import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { CustomValidators } from '../../validations/CustomValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm=new FormGroup({
      fullName: new FormControl('', [
                Validators.required,
                CustomValidators.noNumericValidator
      ]),
      email: new FormControl('', [
             Validators.required,
             Validators.email
      ]),
      password: new FormControl('', [
                Validators.required,
      ]),
      phoneNumber: new FormControl('', [
                   Validators.required,
                   Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)
      ]),
  });

  constructor(
    private router: Router,
    private signupService:SignupService
  ) {}

  ngOnInit(): void {}

  get fullName(){
    return this.signupForm.get('fullName')
  }

  get email(){
    return this.signupForm.get('email')
  }

  get password(){
    return this.signupForm.get('password')
  }

  get phoneNumber(){
    return this.signupForm.get('phoneNumber')
  }

  submit(): void {
    if (this.signupForm.valid) {
      const userData = {
        fullName: this.signupForm.value.fullName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phoneNumber: this.signupForm.value.phoneNumber
      };

      this.signupService.signup(userData).subscribe(
        response => {
          if (response === 'User Exists') {
            this.signupForm.reset();
            alert('User already Exists');
          } else if (response === 'User Does Not Exist') {
            console.log("Signed In");
            this.router.navigate(['/login']);
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
