import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeaturedProductService } from '../../services/featured.product.service';


@Component({
  selector: 'app-product-details',
  imports: [CommonModule,  FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit{

  productId: number = 0;
  selectedImage: string = ''; // Variable to hold the selected image URL
  productDetails:any=[];
  strokeprice:number = 0; // Variable to hold the price after discount
  quntity: number = 1; // Variable to hold the quantity of the product
  
  constructor( private featuredProductService: FeaturedProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.productId = Number(this.route.snapshot.paramMap.get('id')!);    
    this.featuredProductService.getproductById(this.productId).subscribe((data) => {
      this.productDetails = data;
      console.log('Product Details:', this.productDetails);
    });

      this.selectedImage = this.productDetails.images?.[0] || '';
      this.strokeprice = this.getPricewithDiscount(this.productDetails.price, this.productDetails.discountPercentage);
  }

  roundRating(value: number): number {
    return Math.round(value);
  }
  
  getPricewithDiscount(price: number, discount: number): number {
    return Math.round(price + (price * discount) / 100); // Calculate the price after applying the discount
  }

    validateInput()
    {
        if(this.quntity >= this.productDetails.stock)
        {
          
        }else{
          
      }
    }

    changeImage(imageUrl: string) {
        this.selectedImage = imageUrl; // Change the selected image to the clicked thumbnail
    }

    addToCart(product:any) {
      
    }

}
