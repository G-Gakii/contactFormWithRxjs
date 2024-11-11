import { Component, OnInit } from '@angular/core';
import { Contact } from '../../interface/contact';
import { ContactService } from '../../service/contact.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit {
  contactForm!: FormGroup;
  contacts: Contact[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<Contact> = new MatTableDataSource<Contact>();
  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contact) => {
      this.dataSource.data = contact;
    });
    this.contactForm = this.contactService.contactForm;
    // this.dataSource.data = this.contactService.getContactFromLocalStorage();
    // this.dataSource.data = this.contacts;
  }
  deleteContact(id: string) {
    this.contactService.Delete(id);
  }
  Editcontact(contact: Contact) {
    this.contactService.myId.set(contact.id);
    this.contactService.isEdit.set(true);
    this.contactForm.patchValue({
      name: contact.name,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
    });
  }
}
