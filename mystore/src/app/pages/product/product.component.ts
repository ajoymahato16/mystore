import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products$= import('../../components/product-details/product-details.component').then(m=> m.ProductDetailsComponent)


}


