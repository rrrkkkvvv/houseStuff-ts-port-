import { IOrder } from "../../contexts/context types/IOrdersContext";

export interface IProductsProps {
    onShowItem: (product: IOrder) => void;
    items: IOrder[];
}

