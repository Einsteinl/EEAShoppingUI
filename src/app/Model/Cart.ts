import { Product } from './Product';
export interface Cart {
    cartId : string;
    quantity : number;
    username : string;
    product:Product
}
