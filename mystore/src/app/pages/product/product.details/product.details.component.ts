
import { CommonModule } from '@angular/common';
import { Component,OnInit, ViewChild, ElementRef, AfterViewInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { Observable } from 'rxjs';
import { State, Store } from '@ngxs/store';
import { ProductState } from '../../../state/state.product'; // Import the Product interface from the state file
import { CartState, addTocart } from '../../../state/state.cart'; // Import the CartState for cart-related operations
import { wishlistState, addToWishList } from '../../../state/state.wishlist'; // Import the WishlistState for wishlist-related operations

@Component({
  selector: 'app-product.details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product.details.component.html',
  styleUrl: './product.details.component.css'
})

export class ProductDetailsComponent implements OnInit {
  // This component is responsible for displaying product details
    selectedImage: string = ''; // Variable to hold the selected image URL
    product:any = {}; // Initialize an empty product object to hold product details
    strokeprice:number = 0; // Variable to hold the price after discount
    quntity: number = 1; // Variable to hold the quantity of the product
    quntityerror:boolean = false;


  constructor(private routes:ActivatedRoute, private store: Store) { } // Constructor for the component, currently empty
 

  @ViewChild('mainImage') mainImageElement!: ElementRef; // ViewChild to access the main image element in the template
 
  ngAfterViewInit() {
    
  }

  ngOnInit() {

     const product_id = this.routes.snapshot.params['id']; // Get the product ID from the route parameters
      this.product = this.store.selectSnapshot(ProductState.getProductList).find((product) => product.id == product_id); // Find the product in the state using the ID
      this.selectedImage = this.product.images[0];
      this.strokeprice = this.getPricewithDiscount(this.product.price, this.product.discountPercentage);
  }

  roundRating(value: number): number {
    return Math.round(value);
  }
  getPricewithDiscount(price: number, discount: number): number {
    return Math.round(price + (price * discount) / 100); // Calculate the price after applying the discount
  }

    validateInput()
    {
        if(this.quntity >= this.product.stock)
        {
          

        }else{
          
      }
    }

    addToCart(product:any)
    {
      this.store.dispatch( new addTocart([product])); // Dispatch the action to add the product to the cart
    
    }

    addTowishlist(product:any)
    {
      this.store.dispatch( new addToWishList([product])); // Dispatch the action to add the product to the wishlist
    }

}
