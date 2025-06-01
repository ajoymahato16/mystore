import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta,Title } from '@angular/platform-browser';
import { Router  } from '@angular/router';
import { FeaturedProductService } from '../../services/featured.product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuredProducts: any[] = [];

  constructor(
                private titleService: Title, 
                private metaService: Meta, 
                private router: Router, 
                private featureproductService: FeaturedProductService
              ) { }


  ngOnInit(): void {
    this.titleService.setTitle('MyStore - Home');
    this.metaService.updateTag({ name: 'description', content: 'Welcome to MyStore, your one-stop shop for all things awesome!' });
    this.metaService.updateTag({ name: 'keywords', content: 'store, shopping, ecommerce, online store' });

    this.featureproductService.getFeaturedProductList().subscribe((data) => {
      this.featuredProducts = data.products;
      console.log('Featured Products:', this.featuredProducts);
    })

  }


    goToProductPage(){
      this.router.navigate(['/product']);
    }

}
