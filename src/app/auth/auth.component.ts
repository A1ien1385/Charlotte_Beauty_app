import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
 
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
  
    if (!form.valid) {
      return;
    }

   const email = form.value.email;
   const password = form.value.password;

   this.isLoading = true;

   if (this.isLoginMode) {
    //... some logic
   } else {    
    this.authService.signUp(email, password).subscribe(
      resData => {
      console.log(resData);
     }, error => {
      console.log(error);
      this.error = 'An error occurred!';
      this.isLoading = false;
     });

   }

   form.reset(); 
  }
}

// {
//  "rules": {
//    ".read": "auth != null",  
//    ".write": "auth != null",  
//   }
//  }