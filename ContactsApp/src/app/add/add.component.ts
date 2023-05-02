import { Component } from '@angular/core';
import { Contact } from '../contact.class';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  newContact: Contact = new Contact(); // instancier nouveau objet pour ajouter un contact
  showSuccessMessage: boolean = false;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {

  }

  saveContact() {
    this.contactService.addContact(this.newContact).subscribe(
      (response) => {
        console.log(response);
        //this.router.navigate(['/home']); // naviger vers le path home sans rafraichir la page
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000); // cacher message après 3 secondes
        this.newContact.nom = '';
        this.newContact.prenom = '';
        this.newContact.tel = '';
      }), (error: any) => {
        console.log(error);
      }
  }

  formIsValid() {
    return (
      this.newContact &&
      this.newContact.nom &&
      this.newContact.nom.trim().length !== 0 &&
      this.newContact.prenom &&
      this.newContact.prenom.trim().length !== 0 &&
      this.newContact.tel &&
      this.newContact.tel.trim().length !== 0 &&
      this.newContact.status
    );
  }
  // s'assurer que le formulaire n'est pas vide
}
