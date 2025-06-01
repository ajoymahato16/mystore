import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser'; // Import Meta and Title for SEO purposes

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  // This component is responsible for displaying the contact page
  constructor(private titleService: Title, private metaService: Meta) { } // Constructor for the component, currently empty

  ngOnInit(): void {
    // Initialization logic can go here if needed
    this.titleService.setTitle('MyStore - Contact Us'); // Set the page title for SEO
    this.metaService.updateTag({ name: 'description', content: 'Get in touch with MyStore for any inquiries or support.' }); // Update meta description for SEO
    this.metaService.updateTag({ name: 'keywords', content: 'contact us, MyStore, customer support, inquiries' }); // Update meta keywords for SEO
  }

}
