import { OrderItem } from "./OrderItem";

export class SalesOrder {

    id: string;
    userId: string;
    orderNo: number;
    productId: string;
    productName: string;
    productImage: string;
    currentUnitPrice: number;
    quantity: number;
    totalPrice: number;
    createTime: Date;

}
