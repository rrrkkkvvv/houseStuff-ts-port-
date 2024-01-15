import { IOrder } from "./context types/IOrdersContext";
import { ReactNode } from 'react';

export type IModalProps = {
    type: 'full-item'
    show: boolean;
    item: IOrder;
    onShowItem: (item: IOrder) => void;
} | {
    type: 'information';
    show: boolean;
    title: string;
    textContent: ReactNode;
    onShowModal: (type: string) => void;
}

