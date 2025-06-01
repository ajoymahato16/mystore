import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Selector,Store, Select } from '@ngxs/store';
import { CartItem, CartState, CartStateModel, clearCart, removeFromCart } from '../../../state/state.cart'; // Import the CartState for cart-related operations
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-popup',
  imports: [CommonModule],
  templateUrl: './cart-popup.component.html',
  styleUrl: './cart-popup.component.css'
})
export class CartPopupComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>
  
    totalItems$!: Observable<number>;
    totalPrice$!: Observable<number>;

    constructor(private store: Store) {
    }
      
    ngOnInit() {
      
        this.cartItems$ = this.store.select(CartState.items);
      
        this.cartItems$.subscribe((items) => {    
        // console.log('quantity:', items[0].quantity);
          return items;
        });

        this.totalItems$ = this.store.select(CartState.totalItems);
        this.totalPrice$ = this.store.select(CartState.totalPrice);
    }


    removeItemFromCart(id:number){
        this.store.dispatch(new removeFromCart(id));
    }

    clearCart()
    {
      this.store.dispatch(new clearCart()); // Dispatch an action to clear the cart
    }
}
