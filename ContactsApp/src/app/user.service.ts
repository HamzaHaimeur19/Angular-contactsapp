import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  existUser: User = new User();

  constructor(private httpClient: HttpClient) { }

  //methode qui consomme api pour s'inscrire
  signUp(newUser: User): Observable<User> {
    return this.httpClient.post<User>("http://localhost/contacts-app-php.api/register.php", newUser);
  }

  //methode qui consomme api pour se connecter
  signIn(newUser: User): Observable<User> {
    return this.httpClient.post<User>("http://localhost/contacts-app-php.api/login.php", newUser);
  }
}
