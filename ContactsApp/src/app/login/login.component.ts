import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  newUser: User = new User();
  userExists: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.newUser.email = '';
    this.newUser.password = '';

  }

  formIsValid() {
    return (this.newUser.email.trim().length !== 0 && this.newUser.password.trim().length !== 0);
  }

  submitForm() {
    if (this.formIsValid()) {
      this.userService.signIn(this.newUser).subscribe(
        (response) => {
          this.newUser.email = '';
          this.newUser.password = '';
          localStorage.setItem('user', JSON.stringify(response));
          //console.log(this.newUser);
          this.router.navigate(['home']); // navigate to home after successful login
        },
        (error) => {
          console.log('Error:', error);
          if (error.status === 401) {
            this.userExists = true;
          } else {
            this.userExists = false;
          }
        }
      );
    }
  }
  

  isButtonDisabled() {
    return this.userExists || !this.formIsValid();
  }

}
