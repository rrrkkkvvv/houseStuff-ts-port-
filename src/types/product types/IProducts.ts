import { IOrder } from "../context types/IOrdersContext";

export interface IProductsProps {
    onShowItem: (product: IOrder) => void;
    items: IOrder[];
}

