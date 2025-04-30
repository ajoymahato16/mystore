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
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    instock: boolean;
}
//////////////////
// 2. Product State Model
//////////////////
export interface ProductStateModel {
    productList: Product[];
    selectedProductId: number | null;
    loading: boolean;
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
    productList: [],
    selectedProductId: null,
    loading: false,
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
        return state.productList;
    }
    @Selector()
    static getSelectedProductId(state: ProductStateModel): number | null {
        return state.selectedProductId;
    }
    @Selector()
    static updateProductList(state: ProductStateModel): Product[] {
        return state.productList.map((product) => {
            if (product.id === state.selectedProductId) {
                return { ...product, instock: !product.instock };
            }
            return product;
        });
    }

    // 7. Actions
    @Action(LoadProducts)
    Loadproduct(ctx: StateContext<ProductStateModel>, action: LoadProducts){
     // to avoid recuring api call, we can check if the productList is empty or not.
        const state = ctx.getState();
        const skip = (action.page -1) *action.limit;
        if(state.productList.length > 0 && !action.forceReload) return;
        
        ctx.patchState({ loading: true });
        return this.prodcutService.getProducts(action.limit, skip).pipe(
            tap((response) =>{
                ctx.patchState({
                    productList:response.products,
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

    @Action(UpdateProduct)
    updateProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct){

        ctx.setState(
            patch({
                productList: updateItem<Product>(
                    product => product.id === action.id,
                    patch({
                        instock: action.instock,
                    })
                )
            })
        )
    }


}