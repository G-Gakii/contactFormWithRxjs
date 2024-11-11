import { Injectable, signal } from '@angular/core';
import { Contact } from '../interface/contact';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];

  private $contact = new BehaviorSubject<Contact[]>([]);
  contactForm!: FormGroup;
  isEdit = signal(false);
  myId = signal('');

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  saveContactToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
  getContactFromLocalStorage() {
    return JSON.parse(localStorage.getItem('contacts') || '[]');
  }

  createContacts(contact: Contact) {
    contact.id = uuidv4();
    this.contacts.push(contact);

    this.$contact.next(this.contacts);
    this.saveContactToLocalStorage();
  }
  getContacts(): Observable<Contact[]> {
    return this.$contact.asObservable();
  }
  Delete(id: string) {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    this.$contact.next(this.contacts);
    this.saveContactToLocalStorage();
  }
  updateContact(id: string, updated: Contact) {
    let updateContact = this.contacts.find((contact) => (contact.id = id));
    console.log(updateContact);

    if (updateContact) {
      updateContact.name = updated.name;
      updateContact.email = updated.email;
      updateContact.phoneNumber = updated.phoneNumber;
      this.$contact.next(this.contacts);
      this.saveContactToLocalStorage();
    }
    console.log(this.contacts);
  }
}
