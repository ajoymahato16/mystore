
import { CommonModule } from '@angular/common';
import { Component,OnInit, ViewChild, ElementRef} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser'; // Import Meta and Title for SEO purposes
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
    product:any = []; // Initialize an empty product object to hold product details
    strokeprice:number = 0; // Variable to hold the price after discount
    quntity: number = 1; // Variable to hold the quantity of the product


  constructor(private routes:ActivatedRoute, private store: Store, private metaService: Meta, private titleService: Title) { } // Constructor for the component, currently empty
 

  @ViewChild('mainImage') mainImageElement!: ElementRef; // ViewChild to access the main image element in the template
 
  ngAfterViewInit() {
    
  }

  ngOnInit() {
      this.titleService.setTitle('MyStore - Product Details'); // Set the page title for SEO
      this.metaService.updateTag({ name: 'description', content: 'Explore the details of our products at MyStore!' }); // Update meta description for SEO
      this.metaService.updateTag({ name: 'keywords', content: 'product details, ecommerce, online shopping, MyStore' }); // Update meta keywords for SEO

      // Fetch the product ID from the route parameters and find the product in the state
     const product_id = +this.routes.snapshot.params['id']; // Get the product ID from the route parameters
      const productList = this.store.selectSnapshot(ProductState.getProductList); // Find the product in the state using the ID
      this.product = productList.find((product)=> product.id === product_id);
      this.selectedImage = this.product.images?.[0] || '';
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
    //  console.log("Add to cart",this.product);
    //  console.log("Add to cart",this.product.id);
      this.store.dispatch( new addTocart(this.product)); // Dispatch the action to add the product to the cart
    
    }

    addTowishlist(product:any)
    {
     console.log("Add to wishlist",);
      this.store.dispatch( new addToWishList(this.product)); // Dispatch the action to add the product to the wishlist
    }

}
