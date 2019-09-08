import { OrderItem } from "./OrderItem";

export class SalesOrder {

    id: number;
    userId: number;
    orderNo: number;
    productId: number;
    productName: string;
    productImage: string;
    currentUnitPrice: string;
    quantity: number;
    totalPrice: string;
    createTime: Date;

}
