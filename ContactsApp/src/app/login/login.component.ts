import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  newUser: User = new User();
  userExists: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.newUser.email = '';
    this.newUser.password = '';

  }

  formIsValid() {
    return (this.newUser.email.trim().length !== 0 && this.newUser.password.trim().length !== 0);
  }

  submitForm() {
    this.userService.signIn(this.newUser).subscribe((response) => {
      this.newUser.email = '';
      this.newUser.password = '';
      localStorage.setItem('user', JSON.stringify(response)); // convertir les données de l'utilisateur connecté en JSON
      console.log(this.newUser);
      location.href="home"; // naviguer à home après inscription
    },
    (error) => {
      console.log('Error:', error);
      if (error.status === 401) {
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
