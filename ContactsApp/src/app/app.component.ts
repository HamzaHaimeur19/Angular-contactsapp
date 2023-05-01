import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddComponent } from './add/add.component';
import { Contact } from './contact.class';
import { ContactService } from './contact.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ContactsApp';
  showNavBar = true;
  searchTerm: string = "";
  Contacts: Contact[] = [];

  @Output() 
  searchEvent : EventEmitter<string> = new EventEmitter<string>();

  toggleNavBar(component: any) {
    if (component instanceof AddComponent) {
      this.showNavBar = false;
    } else {
      this.showNavBar = true;
    }
  } // cette fonction permet de ne pas afficher le formulaire de recherche pour le component AddComponent

  constructor(private contactService: ContactService) { }

  findContacts() {
    this.contactService.findContacts(this.searchTerm).subscribe(
      (response: Contact[]) => {
        this.Contacts = response;
        this.searchEvent.emit(this.searchTerm); // emettre le mot de recherche pour l'utiliser dans le home component
        console.log(this.Contacts)
      });
  }
}
