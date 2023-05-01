import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.class';
//import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Contacts: Contact[] = [];
  Date!: Date; // objet date pour l'initisialiser
  ContactToEdit: Contact = new Contact(); // objet contact à modifier
  editIndex: number | undefined; // index dans le tableau à modifier
  ContactToDelete: Contact = new Contact(); // objet contact à supprimer
  deleteIndex: number = -1; // index dans le tableau à supprimer
  showModal = true;

  constructor(private contactService: ContactService) { }

  ngOnInit() { //méthode pour initialiser les objets
    //this.Contacts = this.contactService.getContacts();
    this.contactService.getContacts().subscribe(
      (response: Contact[]) => {
        this.Contacts = response;
      }
    )

    this.Date = new Date(); // definir la date d'aujourd'hui
  }

  editContact(index: number) {
    //recuperer la liste des attributs par index
    //console.log('Selected contact:', this.Contacts[index]);
    this.ContactToEdit.id = this.Contacts?.[index]?.id;
    this.ContactToEdit.nom = this.Contacts?.[index].nom;
    this.ContactToEdit.prenom = this.Contacts?.[index].prenom;
    this.ContactToEdit.tel = this.Contacts?.[index].tel;
    this.ContactToEdit.status = this.Contacts?.[index].status;
    this.editIndex = index; // modifier l'index passé en parametre
    //console.log('ContactToEdit:', this.ContactToEdit);
    //console.log("appel de methode avec succés");
  }

  confirmUpdate() {
    this.contactService.updateContact(this.ContactToEdit).subscribe((response) => {
      var updatedContact = new Contact(); // retourner le contact modifié dans le tableau
      updatedContact.id = response.id;
      updatedContact.nom = response.nom;
      updatedContact.prenom = response.prenom;
      updatedContact.tel = response.tel;
      updatedContact.status = response.status;

      this.Contacts[this.editIndex as number] = updatedContact; // remplacer l'ancien contact par le nouveau dans le tableau

      this.ContactToEdit = new Contact(); // créer un nouvel objet Contact pour effacer les valeurs précédentes
    });
  }

  deleteContact(index: number) {
    //recuperer la liste des attributs par index
    //console.log('Selected contact:', this.Contacts[index]);
    this.ContactToDelete.id = this.Contacts?.[index]?.id;
    this.ContactToDelete.nom = this.Contacts?.[index].nom;
    this.ContactToDelete.prenom = this.Contacts?.[index].prenom;
    this.ContactToDelete.tel = this.Contacts?.[index].tel;
    this.ContactToDelete.status = this.Contacts?.[index].status;
    this.deleteIndex = index; // modifier l'index passé en parametre
    //console.log('ContactToEdit:', this.ContactToEdit);
    //console.log("appel de methode avec succés");
  }

  confirmDelete() {
    if (this.deleteIndex === -1) {
      return;
    }
  
    this.contactService.deleteContact(this.ContactToDelete.id).subscribe((response) => {
      this.Contacts.splice(this.deleteIndex, 1);
      this.ContactToDelete = new Contact();
      this.deleteIndex = -1; // reset deleteIndex to -1 after successful deletion
    });
  }
  

}
