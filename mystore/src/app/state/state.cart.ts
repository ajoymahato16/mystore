import { Injectable } from "@angular/core";
import { State, Action, Selector,StateContext } from "@ngxs/store";

export interface CartItem {
    id: number; // Product ID
    name: string; // Product name
    price: number; // Product price
    quantity: number; // Quantity of the product in the cart
    image: string; // Product image URL
}
 
export interface CartStateModel{
    items: CartItem[];
    totalPrice:number;
    totalItems:number;
}
export class addTocart{
    static readonly type = '[cart] Add to cart';
    constructor(public payload: CartItem[])
    {}
}
export class removeFromCart{
    static readonly type = '[cart] Remove from cart';
    constructor(public id:number)
    {}
}
export class clearCart{
    static readonly type = '[cart] clear clart';
    constructor(){}
}

@State<CartStateModel>({
    name: 'cart',
    defaults:{
        items: [], // Initialize an empty array for cart items
        totalPrice: 0, // Initialize total price to 0
        totalItems: 0 // Initialize total items count to 0
    }
})
@Injectable()

export class CartState{

   @Selector()
   static items(state:CartStateModel){
    return state.items;
   }

    @Selector()
    static totalPrice(state: CartStateModel)
    {
        return state.items.reduce((total, item)=> item.price * item.quantity + total, 0);
    }
    @Selector()
    static totalItems(state: CartStateModel)
    {
        return state.items.reduce((total, item) =>  item.quantity + total, 0);
    }


   @Action(addTocart)
   addToCart({getState, patchState}: StateContext<CartStateModel>,{payload}:addTocart){
        const state = getState();
        const existingItem = state.items.find((item) => item.id === payload[0].id);

        if(existingItem){

            console.log("existing item");

            patchState({
                items: state.items.map(
                    item=> item.id === existingItem.id ?{ ...existingItem, quantity: existingItem.quantity + payload[0].quantity}: item
                )
            });

            }else{
                console.log("else block");
                patchState({
                    items: [...state.items, ...payload]
                });   
            }
    }
    @Action(removeFromCart)
    removeFromCart({getState, patchState}: StateContext<CartStateModel>,{id}:removeFromCart){
        const state = getState();
        patchState({
            items: state.items.filter((item)=> item.id !==id)
        })
    }
    @Action(clearCart)
    clearCart({patchState}: StateContext<CartStateModel>){
        patchState({
            items:[],
            totalItems:0,
            totalPrice:0
        })
    }
}