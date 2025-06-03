import { Component, OnInit } from '@angular/core';
import{ Meta, Title } from '@angular/platform-browser'; // Import Meta and Title for SEO purposes
import { AboutInfoComponent } from '../../components/about-info/about-info.component'; // Import the AboutInfoComponent
@Component({
  selector: 'app-about',
  imports: [AboutInfoComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) { } // Constructor for the component

  ngOnInit(): void {
    this.titleService.setTitle('MyStore - About Us'); // Set the page title for SEO
    this.metaService.updateTag({ name: 'description', content: 'Learn more about MyStore, our mission, and our values.' }); // Update meta description for SEO
    this.metaService.updateTag({ name: 'keywords', content: 'about us, MyStore, ecommerce, online shopping' }); // Update meta keywords for SEO
  } 

}
