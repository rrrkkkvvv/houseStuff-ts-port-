import { IOrder } from "../../contexts/context types/IOrdersContext";

export interface IProductProps {
    onShowItem: (product: IOrder) => void;
    item: IOrder;
}

