import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface featuredProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    thumbnail: string;
    rating: {
        rate: number;
        count: number;
    };
}
@Injectable({
    providedIn: 'root'
})

export class FeaturedProductService {
    private getFeaturedProductUrl = 'https://dummyjson.com/products';

    constructor(private http: HttpClient) { }

    getFeaturedProductList(): Observable<{ products: featuredProduct[]}> {
        return this.http.get<{ products: featuredProduct[]}>(this.getFeaturedProductUrl);
    }

    getFeatureproductById(id: number): Observable<featuredProduct>{
        return this.http.get<featuredProduct>(`${this.getFeaturedProductUrl}/${id}`);
    }
    
    searchProducts(query: string): Observable<featuredProduct[]> {
        return this.http.get<featuredProduct[]>(`${this.getFeaturedProductUrl}/search/q=${query}`);
    }

}