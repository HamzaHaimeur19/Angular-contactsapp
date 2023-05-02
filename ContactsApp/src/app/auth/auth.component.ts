import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  newUser: User = new User();
  userExists: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.newUser.nom = '';
    this.newUser.prenom = '';
    this.newUser.email = '';
    this.newUser.password = '';
  }

  formIsValid() {
    return (
      this.newUser.nom.trim().length !== 0 &&
      this.newUser.prenom.trim().length !== 0 &&
      this.newUser.email.trim().length !== 0 &&
      this.newUser.password.trim().length !== 0
    );
  }

  submitForm() {
    this.userService.signUp(this.newUser).subscribe(
      (response) => {
        this.newUser.nom = '';
        this.newUser.prenom = '';
        this.newUser.email = '';
        this.newUser.password = '';
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log('Error:', error);
        if (error.status === 409) {
          this.userExists = true;
          //console.log('User exists:', this.userExists);
        } else {
          this.userExists = false;
        }
      }
    );
  }

  isButtonDisabled() {
    return this.userExists || !this.formIsValid();
  }
}
