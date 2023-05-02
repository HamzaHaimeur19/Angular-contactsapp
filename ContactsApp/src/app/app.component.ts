import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddComponent } from './add/add.component';
import { AuthComponent } from './auth/auth.component';
import { Contact } from './contact.class';
import { ContactService } from './contact.service';
import { LoginComponent } from './login/login.component';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpRequest } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContactsApp';
  showNavBar = true;
  showWholeNavBar = true;
  searchTerm: string = "";
  Contacts: Contact[] = [];
  logged: boolean = false;
  existingUser: User | null = null;



  @Output()
  searchEvent: EventEmitter<string> = new EventEmitter<string>();

  toggleNavBar(component: any) {
    if (component instanceof AddComponent || component instanceof AuthComponent || component instanceof LoginComponent) {
      this.showNavBar = false;
    } else {
      this.showNavBar = true;
    }
  } // cette fonction permet de ne pas afficher le formulaire de recherche pour le component AddComponent/AuthComponent et LoginComponent

  
  constructor(private contactService: ContactService, private userService: UserService,
    private router: Router) { }


    ngOnInit() {
      if(this.userService.isLoggedIn !==null){
        this.logged = true;
        this.existingUser = this.userService.isLoggedIn();
      } else {
        this.logged = false;
      }
    }
    

  findContacts() {
    this.contactService.findContacts(this.searchTerm).subscribe(
      (response: Contact[]) => {
        this.Contacts = response;
        this.searchEvent.emit(this.searchTerm); // emettre le mot de recherche pour l'utiliser dans le home component
        //console.log(this.Contacts)
      });
  }

  signOut() {
    this.userService.LogOut();
    this.logged = false;
    
    this.router.navigate(['/login']);
  }
}
