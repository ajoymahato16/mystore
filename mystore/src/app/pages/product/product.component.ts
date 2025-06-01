import { Component,OnInit } from '@angular/core';
import { Meta,Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Product, LoadProducts, ProductState } from '../../state/state.product';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterModule  } from '@angular/router';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  product$!: Observable<Product[]>;

  limit = 10;
  page = 0;
  constructor( private store: Store, private titleService: Title, private metaService: Meta){
  
  }


  ngOnInit(): void {
    this.titleService.setTitle('MyStore - Products');
    this.metaService.updateTag({ name: 'descrription', content:'Explore our wide range of products at MyStore!' });
    this.metaService.updateTag({ name: 'keywords', content: 'products, ecommerce, online shopping, MyStore' });

    this.product$ = this.store.select(ProductState.getProductList);
    this.pageload(this.page);
    
    this.product$.subscribe((data) => {
      console.log('oninit subscribe:',data);
      return data;

    });
  }

  // Method to load products
  pageload(page:number){

    this.page = page;
    this.store.dispatch(new LoadProducts(this.page,this.limit));
    console.log('page:',this.page);
    console.log('limit:',this.limit);
    
  }

  //next page
  nextPage() {
    this.page++;
    this.pageload(this.page);
  }
  //previous page
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.pageload(this.page);
    }
  }



}


