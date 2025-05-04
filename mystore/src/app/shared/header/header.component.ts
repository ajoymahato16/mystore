import { AfterViewInit, Component, ElementRef,  ViewChild, ChangeDetectionStrategy, OnInit, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CartPopupComponent } from '../../pages/poup/cart-popup/cart-popup.component';
import { WishlistPopUpComponent } from '../../pages/poup/wishlist-pop-up/wishlist-pop-up.component';
import { CommonModule } from '@angular/common';
import { authService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';



@Component({
  selector: 'app-header',
  imports: [LoginComponent, WishlistPopUpComponent, CartPopupComponent, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent implements OnInit {

  @ViewChild('authenticationModal') authenticationModalRef!: ElementRef;
  @ViewChild('loginModalOverlay') loginModalOverlay!: ElementRef;

  @ViewChild('cartPopup') cartPopup !: ElementRef;
  @ViewChild('wishlistPopUp') wishlistPopUp !: ElementRef;

  isloggedin$!: Observable<boolean>;


  constructor(private authService:authService, private store: Store) {
    
  }

 
  ngOnInit(): void {    
    this.isloggedin$ = this.store.select(state => state.user.loggedIn);
  }

  
  onLoginSuccess() {
  }

  ngAfterViewInit(): void {
    
  
  }
  toggleCart(){
    this.cartPopup.nativeElement.classList.toggle('hidden');
    this.wishlistPopUp.nativeElement.classList.add('hidden');
  }
  toggleWishlist()
  {
    this.wishlistPopUp.nativeElement.classList.toggle('hidden');
    this.cartPopup.nativeElement.classList.add('hidden');
  }

  // Add any additional methods or properties needed for the header component
  showModal() {
    //this.loginModal.classList.remove('hidden');
      this.authenticationModalRef.nativeElement.classList.remove('hidden');
      this.authenticationModalRef.nativeElement.classList.add('flex');
      this.loginModalOverlay.nativeElement.classList.remove('hidden');
  }
  hideLoginPopup()
  {
    this.authenticationModalRef.nativeElement.classList.add('hidden');
    this.authenticationModalRef.nativeElement.classList.remove('flex');
    this.loginModalOverlay.nativeElement.classList.add('hidden');

    
  }

 
  loggedout() {
    this.authService.logout(); // Call the logout method from authService
    alert("Logout Successful");
    this.hideLoginPopup(); // Hide the login popup after logout
    
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
