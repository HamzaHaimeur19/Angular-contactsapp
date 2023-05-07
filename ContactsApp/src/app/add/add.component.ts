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
  selectedFile: File | null = null;

  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newContact.image = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  /*saveContact() {
    this.contactService.addContact(this.newContact).subscribe(
      (response) => {
        //console.log(response);
        //this.router.navigate(['/home']); // naviger vers le path home sans rafraichir la page
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000); // cacher message après 3 secondes
        this.newContact.nom = '';
        this.newContact.prenom = '';
        this.newContact.tel = '';
      }), (error: any) => {
        console.log(error);
      }
  }*/

  saveContact() {
    console.log(this.newContact);
    if (!this.formIsValid()) {
      return;
    }
  
    if (this.selectedFile) {
      // Create a new Contact object with the form data
      const newContact: Contact = {
        id: 0,
        nom: this.newContact.nom,
        prenom: this.newContact.prenom,
        tel: this.newContact.tel,
        status: this.newContact.status,
        image: this.selectedFile
      };

      console.log(newContact);
  
      // Upload the image file
      this.contactService.addContact(newContact, this.selectedFile).subscribe(
        (response) => {
          this.showSuccessMessage = true;
          console.log(this.newContact);
          setTimeout(() => this.showSuccessMessage = false, 3000);
          this.newContact.nom = '';
          this.newContact.prenom = '';
          this.newContact.tel = '';
          this.selectedFile = null;
        },
        (error: any) => {
          console.log("whatsapp");
        }
      );
    } else {
   
       console.log("papa");
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