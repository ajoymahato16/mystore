import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, updateItem } from '@ngxs/store/operators';
import { ProductService } from '../services/product.service';
import { Observable,tap } from 'rxjs';
import { table } from 'console';
import { response } from 'express';


//////////////////
// 1. Product Model
//////////////////

export interface Product {
    id: number;
    title: string;
    price: number;
    images?: string[] | null;
    description: string;
    thumbnail: string;
    instock: boolean;
    discountPercentage: number;
    rating: number;
}
//////////////////
// 2. Product State Model
//////////////////
export interface ProductStateModel {
    productList: { [page: number]: Product[] };
    selectedProductId: number | null;
    loading: boolean;
    currentPage: number; // ← Add this
}

///////////////////////////////////////
// 3. Product Action Name
////////////////////////////////////


export class LoadProducts {
    static readonly type = '[Product] Load Products';
    constructor(public limit: number, public page: number, public forceReload:boolean = false) {}

}
export class SelectProduct {
    static readonly type = '[Product] Select';
    constructor(public id: number) {}
}

export class UpdateProduct {
    static readonly type = '[Product] Update';
    constructor(public id: number, public instock: boolean) {}
}

export class ClearSelectedProduct {
    static readonly type = '[Product] Clear Selected';
}

////////////////////////////////////////
// 4. initial state
/////////////////////////////

const initialState: ProductStateModel = {
    productList: {},
    selectedProductId: null,
    loading: false,
    currentPage: 1,
};


//////////////////////
// 5. Product State Defination
/////////////////////

@State<ProductStateModel>({
    name: 'product',
    defaults: initialState,
})
@Injectable()


export class ProductState {


    constructor( private prodcutService: ProductService) {}


    // 6. Selectors
    @Selector()
    static getProductList(state: ProductStateModel): Product[] {
        if (!state || !state.productList) return []; // ✅ Prevent error on initial load
        const  currentPage = Object.keys(state.productList).length > 0 ? Math.max(...Object.keys(state.productList).map(Number)) :0;
        return state.productList[currentPage] || [];
    }

    @Selector()
    static getSelectedProductId(state: ProductStateModel): number | null {
        return state.selectedProductId;
    }
    // @Selector()
    // static updateProductList(state: ProductStateModel): Product[] {
    //   // return state.productList.map((product) => product.id === state.selectedProductId ? { ...product, } : product);
    // }

    // 7. Actions
    @Action(LoadProducts)
    Loadproduct(ctx: StateContext<ProductStateModel>, action: LoadProducts){
     // to avoid recuring api call, we can check if the productList is empty or not.
        const state = ctx.getState();
     
        const skip = (action.page -1) *action.limit;
     
        if(state.productList[action.page] && !action.forceReload) return;
        
        ctx.patchState({ loading: true });
        return this.prodcutService.getProducts(action.limit, skip).pipe(
            tap((response) =>{
                ctx.patchState({

                    productList:{
                        ... state.productList,
                        [action.page]:response.products,
                    } ,
                    currentPage: action.page,
                    loading: false,

                  
                })

            })

        );

      
    }

    @Action(SelectProduct)
    selectProduct(ctx: StateContext<ProductStateModel>, action: SelectProduct){
        ctx.patchState({
            selectedProductId:action.id,
        })
    }



}