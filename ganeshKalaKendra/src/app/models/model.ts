export class Customer {
    _id?: string;
    name: string;
    address?: string;
    phone?: string;
}

export class Product {
    _id?: string;
    name: string;
    quantity?: number;
    rate: number;
    price?: number;
}

export class Bill {
    _id?: string;
    billNo: number;
    name: string;
    customerType: string;
    createdDate: string;
    deliveryDate: string;
    billHtml: string;
    products?: string[];
    quantity?: number;
    month?: string;
    year?: string;
    totalAmt: number;
    balanceAmt: number;
    mobileNo: number;
}

export class BillNo {
    _id?: string;
    billNo: number;
}
