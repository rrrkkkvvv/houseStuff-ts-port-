import { useState, createContext, useContext } from 'react'
import { PopUpContext } from './popUp-context';
import { ContextProps } from '../types/context types/IContext';
import { IOrder, IOrdersContextValue } from '../types/context types/IOrdersContext';
export default function OrdersContextProvider({ children }: ContextProps) {


    const popUpContext = useContext(PopUpContext)


    let [orders, setOrders] = useState<IOrder[]>([]);

    function addToOrder(item: IOrder): void {
        if (popUpContext) {
            let itIsInCart = false
            orders.forEach(el => {
                if (el.id === item.id) {
                    itIsInCart = true;
                }
            });

            if (!itIsInCart) {
                setOrders(orders = [...orders, item])

                popUpContext.showPopUpFn({ type: "", text: "Product was added in cart" })
            } else {
                popUpContext.showPopUpFn({ type: "red", text: "Product in cart!!" })
            }
        }


    }
    function deleteOrder(itemId: number): void {
        setOrders(orders = orders.filter(el => el.id !== itemId))
    }

    const value: IOrdersContextValue = {
        orders,
        addToOrder,
        deleteOrder,

    }


    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    )

}
export const OrdersContext = createContext<IOrdersContextValue | undefined>(undefined)
