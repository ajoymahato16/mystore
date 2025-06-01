import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Selector,Store, Select } from '@ngxs/store';
import { wishlistItem, wishlistStateModel, addToWishList, removeFromWishList, clearWishList, wishlistState } from '../../../state/state.wishlist';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist-pop-up',
  imports: [CommonModule],
  templateUrl: './wishlist-pop-up.component.html',
  styleUrl: './wishlist-pop-up.component.css'
})
export class WishlistPopUpComponent {
  wlItem$!: Observable<wishlistItem[]>
  
    wltotalItems$!: Observable<number>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    
      this.wlItem$ = this.store.select(wishlistState.items);
    
      this.wlItem$.subscribe((items) => {    
     //   console.log('quantity:', items[0].quantity);
        return items;
      });

      this.wltotalItems$ = this.store.select(wishlistState.totalItems);
  }


    removeItemFromWishlist(id:number){
        this.store.dispatch(new removeFromWishList(id));
    }

    clearWishlist()
    {
      this.store.dispatch(new clearWishList()); // Dispatch an action to clear the cart
    }
}
