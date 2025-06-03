import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})


export class ContactFormComponent implements OnInit {
  formSubmitted = false;
  formContact: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.formContact = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    })
    
  }

  onSubmit() {
    if(this.formContact.valid){
      console.log(this.formContact.value);
      this.formSubmitted = true;
      this.formContact.reset();
    }
  }



}
