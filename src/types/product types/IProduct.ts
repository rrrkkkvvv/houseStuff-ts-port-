import { IOrder } from "../context types/IOrdersContext";

export interface IProductProps {
    onShowItem: (product: IOrder) => void;
    item: IOrder
}

