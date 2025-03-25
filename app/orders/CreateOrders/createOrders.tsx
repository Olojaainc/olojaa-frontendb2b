import Delivery from "./Delivery";
import OrderDetails from "./OrderDetails";

interface ICreateOrder{
    isCreateOrder:boolean;
    onCloseOrder: () => void;
}

export default function CreateOrder({isCreateOrder, onCloseOrder}:ICreateOrder) {
    return(
       <OrderDetails isCreateOrder={isCreateOrder} onCloseOrder={onCloseOrder} />
        // <Delivery isCreateOrder={isCreateOrder} onCloseOrder={onCloseOrder} />
    )
}