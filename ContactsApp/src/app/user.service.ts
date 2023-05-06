import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  existUser: User | null = null;
  userChanged: Subject<User | null> = new Subject<User | null>();

  constructor(private httpClient: HttpClient, private router : Router) {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.existUser = JSON.parse(userString) as User;
    }
  }

  //methode qui consomme api pour s'inscrire
  signUp(newUser: User): Observable<User> {
    return this.httpClient.post<User>("http://localhost/contacts-app-php.api/register.php", newUser);
  }


  //fonction pour recuperer credentials de l'utilisateur connecté
  isLoggedIn(): User | null {
    const userString = localStorage.getItem('user');
  if (userString) {
    const user: User = JSON.parse(userString);
    return user;
  } else {
    return null;
  }
  }

    //methode qui consomme api pour se connecter
    signIn(newUser: User): Observable<User | null> {
      return this.httpClient.post<User>("http://localhost/contacts-app-php.api/login.php", newUser)
      .pipe(
        tap((user: User | null) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.existUser = user;
          this.userChanged.next(user); // emettre le nouveau utilisateur pour l'utiliser dans app component
        })
      );
  }
  

  //méthode pour se déconnecter
  LogOut(){
    localStorage.clear();
    this.existUser = null;
    localStorage.removeItem('user');
    this.userChanged.next(null); // emettre user changed a null
    this.router.navigate(['login']);
  }
}
