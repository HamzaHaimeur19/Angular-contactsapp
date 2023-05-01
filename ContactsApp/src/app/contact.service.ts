import { Injectable } from '@angular/core';
import { Contact } from './contact.class';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root' // accessible par tout le projet (root)
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }
  //recuperer les contacts à l'aide de l'api get_contacts
  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>("http://localhost/contacts-app-php.api/get_contacts.php");
  }

  //enregistrer un nouveau contact à l'aide de l'api add_contact
  addContact(newContact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>("http://localhost/contacts-app-php.api/add_contact.php", newContact);
  }

  //modifier un contact à l'aide de l'api update_contact
  updateContact(editContact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>("http://localhost/contacts-app-php.api/update_contact.php", editContact);
  }

  //supprimer un contact à l'aide de l'api delete_contact
  deleteContact(contactId: number): Observable<object> {
    return this.httpClient.delete<Object>("http://localhost/contacts-app-php.api/delete_contact.php?id=" + contactId);
  }




}
