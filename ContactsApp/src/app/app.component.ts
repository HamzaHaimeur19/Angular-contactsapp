import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddComponent } from './add/add.component';
import { AuthComponent } from './auth/auth.component';
import { Contact } from './contact.class';
import { ContactService } from './contact.service';
import { LoginComponent } from './login/login.component';


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

  @Output()
  searchEvent: EventEmitter<string> = new EventEmitter<string>();

  toggleNavBar(component: any) {
    if (component instanceof AddComponent || component instanceof AuthComponent || component instanceof LoginComponent) {
      this.showNavBar = false;
    } else {
      this.showNavBar = true;
    }
  } // cette fonction permet de ne pas afficher le formulaire de recherche pour le component AddComponent/AuthComponent et LoginComponent

  toggleWholeNavBar(component: any) {
    if (component instanceof LoginComponent || component instanceof AuthComponent ) {
      this.showWholeNavBar = false;
    } else {
      this.showWholeNavBar = true;
    }
  } // cette fonction permet de ne pas afficher le formulaire de recherche pour le component AddComponent/AuthComponent et LoginComponent

  constructor(private contactService: ContactService) { }

  findContacts() {
    this.contactService.findContacts(this.searchTerm).subscribe(
      (response: Contact[]) => {
        this.Contacts = response;
        this.searchEvent.emit(this.searchTerm); // emettre le mot de recherche pour l'utiliser dans le home component
        //console.log(this.Contacts)
      });
  }
}
