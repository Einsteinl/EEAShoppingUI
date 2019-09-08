import { Promotion } from "./Promotion";


export interface Product {
    id: string;
    name:string;
    categoryId:string;
    subtitle:string;
    price: number;
    stock:number;
    subImages:string
    promotion:Promotion

}
