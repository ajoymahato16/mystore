import { Component, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta,Title } from '@angular/platform-browser';
import { Router  } from '@angular/router';
import { FeaturedProductService } from '../../services/featured.product.service';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  featuredProductlist: any[] = [];
  catgoeries: any[] = [];
  isDropdownOpen = false;
  selectCategory: string = '';

  searchTerm:string = "";

  private searchSubject = new Subject<string>();

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
    
    this.loadFeaturedProducts();
    this.getCatgories();

    this.searchSubject
        .pipe(
          debounceTime(300), distinctUntilChanged()
        )
        .subscribe((term) =>{
          if(term){
            console.log('Search Term final:', term);
            this.featureproductService.searchProducts(term).subscribe((data) => {
              this.featuredProductlist = data.products;
            });

            }else{
              this.loadFeaturedProducts();
              console.log('search term is empty');
            }
     
        })



  }

    loadFeaturedProducts() {
      this.featureproductService.getFeaturedProductList().subscribe((data) => {
        this.featuredProductlist = data.products;
       
      })
      console.log('Featured Products:', this.featuredProductlist);
    }


    goToProductPage(){
      this.router.navigate(['/product']);
    }


    onSearchChange(term:string){
      this.searchSubject.next(term.trim())
        console.log('Search Term:', term);
    }

    
    getProductbyCategory(category: string) {
       console.log('Selected Category:', category);
       this.featureproductService.getproductByCategory(category).subscribe((data)=> {
        this.featuredProductlist = data.products;
        console.log('Products in Category:', this.featuredProductlist);
       })
      this.isDropdownOpen = false; // Close the dropdown after selection
      this.selectCategory = category; // Update the selected category
    }




    getCatgories() {
      this.featureproductService.getCategories().subscribe((data) => {
        this.catgoeries = data;
        console.log('Categories:', data);
      });
    }


    showDoropdown(){
      this.isDropdownOpen = !this.isDropdownOpen;
      console.log('isDropdownOpen:', this.isDropdownOpen);
      
    }

}
