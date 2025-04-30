import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [ RouterModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent  {

  copyrightYear: number = new Date().getFullYear(); // Get the current year
  companyName: string = 'MyStore'; // Replace with your company name
  
}
