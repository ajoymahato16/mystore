import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { CartState } from '../../../state/state.cart'; // Import the CartState for cart-related operations

@Component({
  selector: 'app-cart-popup',
  imports: [CommonModule],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.css'
})
export class CartPopupComponent implements OnInit {

  cartItems: any = []; // Array to hold the items in the cart
  totalPrice: number = 0; // Variable to hold the total price of the cart items


  constructor(private store: Store){}

 ngOnInit() {
  this.cartItems = this.store.selectSnapshot(CartState.items)
  console.log('cart items:', this.cartItems); // Log the cart items to the console
  this.totalPrice = this.store.selectSnapshot(CartState.totalPrice); // Get the total price from the CartState
   
 }

  removeFromCart(product:any) {
    // Logic to remove the product from the cart
  }

  clearCart()
  {

  }
}
