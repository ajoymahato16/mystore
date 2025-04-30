import{ Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Product } from '../state/state.product';


@Injectable({
    providedIn:'root'
})

export class ProductService {
    private readonly getProductUrl = 'https://dummyjson.com/products'
    private updateProductUrl = ''

    constructor(private http: HttpClient) { }

    getProducts(limit:number, skip:number):Observable<{products: Product[], total: number}>{

        const params= new HttpParams()
        .set('limit', limit.toString())
        .set('skip', skip.toString())

        return this.http.get<{products: Product[], total:number}>(this.getProductUrl,{params})

    }


}
