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

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {

  }

  saveContact() {
    this.contactService.addContact(this.newContact).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home']); // naviger vers le path home sans rafraichir la page
      }), (error: any) => {
        console.log(error);
      }
  }
}
