import { inject, Injectable } from "@angular/core";
import { State, StateContext, Action, Selector } from "@ngxs/store";
import { tap } from "rxjs";

export interface wishlistItem {
    id:number;
    title:string;
    price:number;
    thumbnail:string;
    quantity:number;
}
export interface wishlistStateModel
{
    items:wishlistItem[];
    total:number;
}

export class addToWishList{
    static readonly type = '[wishlist] add to wishlist';
    constructor(public payload:wishlistItem){}
}
export class removeFromWishList{
    static readonly type = '[wishlist] remove from wishlist';
    constructor(public id:number){}
}
export class clearWishList{
    static readonly type = '[wishlist] clear wishlist';
    constructor(){}
}

@State<wishlistStateModel>({
    name:'wishlist',
    defaults:{
        items:[],
        total:0
    }
})
@Injectable()

export class wishlistState{

    @Selector()
    static items(state: wishlistStateModel){
        return state.items;
    }

   @Selector()
   static getwishlistItems(state: wishlistStateModel): wishlistItem[] {
     return state.items;
   }

    
    @Selector()
    static totalItems(state: wishlistStateModel)
    {
        return state.items.reduce((total, item) =>  item.quantity + total, 0);
    }

     @Action(addToWishList)
    addTowishlist({getState, patchState}: StateContext<wishlistStateModel>, {payload}:addToWishList){
      //  console.log('payload', payload);
        const state = getState();
        
        const existingItem = state.items.find((item)=> item.id === payload.id);

        if(!existingItem){
            patchState({
                items:[...state.items, payload],
                total:state.total + payload.quantity
               
            })
        }
        console.log('state', state);
    }

    @Action(removeFromWishList)
    removeFromWishlist({getState, patchState}: StateContext<wishlistStateModel>,{id}:removeFromWishList){
        const state = getState();
        patchState({
            items: state.items.filter((item)=> item.id !==id)
        })
    }

   
    @Action(clearWishList)   
    clearWishlist({patchState}: StateContext<wishlistStateModel>){
        patchState({
            items:[],
            total:0,
        })
    }

}