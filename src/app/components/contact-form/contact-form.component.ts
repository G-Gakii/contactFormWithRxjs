import { Component, effect, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../service/contact.service';
import { v4 as uuidv4, validate } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;
  isEdit!: boolean;
  id!: string;
  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router
  ) {
    effect(() => {
      this.isEdit = this.contactService.isEdit();
      this.id = contactService.myId();
    });
  }
  ngOnInit(): void {
    this.contactForm = this.contactService.contactForm;
  }

  addContact() {
    if (this.contactForm.valid) {
      let contact = this.contactForm.value;
      if (this.isEdit) {
        this.contactService.updateContact(this.id, contact);
      } else {
        this.contactService.createContacts(contact);
      }

      this.contactForm.reset();
      this.contactService.isEdit.set(false);
    } else {
      throw new Error('invalid input');
    }
  }
}
