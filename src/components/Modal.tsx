import { useContext } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { OrdersContext } from '../contexts/orders-context';
import { IModalProps } from '../types/IModal';

const Modal: React.FC<IModalProps> = (props) => {
    const ordersData = useContext(OrdersContext)

    if (!ordersData) {
        return <div>failed...</div>;
    }


    if (props.type === "full-item") {
        return (
            <div className={`modal full-item  ${props.show && 'visible'}`} onClick={() => props.onShowItem(props.item)}>
                <div className='modal-body' onClick={(e) => e.stopPropagation()} >
                    <span className='close-modal-x' onClick={() => props.onShowItem(props.item)}><AiOutlineClose></AiOutlineClose></span>
                    <img onClick={() => props.onShowItem(props.item)} src={"./imgs-public/" + props.item.img} alt={props.item.img} />
                    <h2>{props.item.title}</h2>
                    <p>{props.item.fullDesc}</p>
                    <b>{props.item.price}$</b>
                    <div className='add-to-cart' onClick={() => ordersData.addToOrder(props.item)}>+</div>
                </div>
            </div>)
    } else {
        return (
            <div className={`modal  ${props.show && 'visible'}`} onClick={() => props.onShowModal("close")}>

                <div className='modal-body' onClick={(e) => e.stopPropagation()}>
                    <span className='close-modal-x' onClick={() => props.onShowModal("close")}><AiOutlineClose></AiOutlineClose></span>
                    <h1 className='modal-title'>{props.title}</h1>
                    <div className='modal-text-content'>{props.textContent}</div>
                </div>
            </div>
        )
    }

}

export default Modal