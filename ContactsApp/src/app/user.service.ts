import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //existUser: User = new User();
  existUser: User | null = null;


  constructor(private httpClient: HttpClient) { }

  //methode qui consomme api pour s'inscrire
  signUp(newUser: User): Observable<User> {
    return this.httpClient.post<User>("http://localhost/contacts-app-php.api/register.php", newUser);
  }

  //methode qui consomme api pour se connecter
  signIn(newUser: User): Observable<User> {
    return this.httpClient.post<User>("http://localhost/contacts-app-php.api/login.php", newUser);
  }

  

  //fonction pour recuperer credentials de l'utilisateur connecté
  isLoggedIn(): User | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString) as User;
      return user;
      console.log(user);
    } else {
      return null;
    }
  }
  //méthode pour se déconnecter
  LogOut() {
    localStorage.clear()
    this.existUser = null;
    //location.reload();
  }
}
