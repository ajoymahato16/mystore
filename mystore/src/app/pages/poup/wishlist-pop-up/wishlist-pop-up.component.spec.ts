import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistPopUpComponent } from './wishlist-pop-up.component';

describe('WishlistPopUpComponent', () => {
  let component: WishlistPopUpComponent;
  let fixture: ComponentFixture<WishlistPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
