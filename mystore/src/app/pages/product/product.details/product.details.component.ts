
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Observable } from 'rxjs';
import { State, Store } from '@ngxs/store';
import { ProductState } from '../../../state/state.product'; // Import the Product interface from the state file

@Component({
  selector: 'app-product.details',
  imports: [CommonModule],
  templateUrl: './product.details.component.html',
  styleUrl: './product.details.component.css'
})

export class ProductDetailsComponent implements OnInit {
  // This component is responsible for displaying product details
    selectedImage: string = ''; // Variable to hold the selected image URL
    product:any = {}; // Initialize an empty product object to hold product details


  constructor(private routes:ActivatedRoute, private store: Store) { } // Constructor for the component, currently empty
 

  @ViewChild('mainImage') mainImageElement!: ElementRef; // ViewChild to access the main image element in the template
 
  ngAfterViewInit() {
      // This lifecycle hook is called after the view has been initialized
      if (this.mainImageElement) {
        this.mainImageElement.nativeElement.src = this.selectedImage; // Set the initial image source to the selected image
      } else {
        console.error('Main image element is not available.');
      }
  }

  ngOnInit() {

     const product_id = this.routes.snapshot.params['id']; // Get the product ID from the route parameters

    console.log('id:', product_id); // Log the product ID to the console for debugging purposes
    console.log('state:',this.store.selectSnapshot(ProductState.getProductList)); // Log the current product list state to the console

    this.product = this.store.selectSnapshot(ProductState.getProductList).find((product) => product.id == product_id); // Find the product in the state using the ID
  
    console.log('product:',this.product); // Log the product details to the console for debugging purposes
    this.selectedImage = this.product.images[0];
    // Check if the product is found and log its details

  }

  changeImage(image: string): void {
    if (this.mainImageElement) {
      this.mainImageElement.nativeElement.src = image; // Update the image source
    } else {
      console.error('Main image element is not available.');
    }
  }

}
