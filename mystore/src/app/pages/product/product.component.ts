import { Component,OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common'; 
import { NgxsModule } from '@ngxs/store';
import { Store } from '@ngxs/store';
import { LoadProducts } from '../../state/state.product';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-product',
  imports: [CommonModule, NgxsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  limit = 10;
  page = 0;
  constructor( private store: Store){

  }

  ngOnInit(): void {

    this.pageload(this.page);
  }

  // Method to load products
  pageload(page:number){

    this.page = page;
    this.store.dispatch(new LoadProducts(this.limit, this.page));

  }

  //next page
  nextPage() {
    this.page++;
    this.pageload(this.page);
  }
  //previous page
  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.pageload(this.page);
    }
  }



}


