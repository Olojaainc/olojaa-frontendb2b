import { ICardContent } from "../Types/Interfaces/ICard";
import ListBullets from '@/public/ListBulletsBlack.svg';
import CheckCircle from '@/public/CheckCircle.svg';
import ClockCountdown from '@/public/ClockCountdown.svg';
import Repeat from '@/public/Repeat.svg';
import ConfirmIcon from '@/public/ConfirmIcon.svg';
import deliveryTruck from '@/public/deliveryTruck.svg';


export const data = {
    "status": true,
    "message": "Orders",
    "data": [
        {
            "slug": "da31f66a-e163-4be8-bbe2-ab1a6a34dadc",
            "order_number": "OLJ202502SmL",
            "quantity": 50,
            "address": "Somolu street and bariga",
            "delivery_date": "2025-03-08 00:00:00",
            "delivery_type": "recurring",
            "status": "pending",
            "gas_price": "500.00",
            "total_amount": "25000.00",
            "created_at": "2025-02-19T16:13:59.000000Z"
        },
        {
            "slug": "a94628f9-fd9b-4d01-9afb-6c2c342e60ea",
            "order_number": "OLJ202502Ksu",
            "quantity": 50,
            "address": "Somolu street and bariga",
            "delivery_date": "2025-03-08 00:00:00",
            "delivery_type": "recurring",
            "status": "completed",
            "gas_price": "500.00",
            "total_amount": "25000.00",
            "created_at": "2025-02-19T16:14:55.000000Z"
        },
        {
            "slug": "db62d036-4009-4d0b-9893-717d5af27460",
            "order_number": "OLJ2025023ta",
            "quantity": 20,
            "address": "Somolu street and bariga",
            "delivery_date": "2025-03-08 00:00:00",
            "delivery_type": "recurring",
            "status": "pending",
            "gas_price": "500.00",
            "total_amount": "10000.00",
            "created_at": "2025-02-19T16:16:15.000000Z"
        },
        {
            "slug": "30f44105-5f16-4255-a61e-ae1f4f6f7b20",
            "order_number": "OLJ2025025cf",
            "quantity": 20,
            "address": "Somolu street and bariga",
            "delivery_date": "2025-03-08 00:00:00",
            "delivery_type": "recurring",
            "status": "recurring",
            "gas_price": "500.00",
            "total_amount": "10000.00",
            "created_at": "2025-02-19T16:17:27.000000Z"
        },
        {
            "slug": "7f061dce-a0d9-4278-a6a7-3542b0badacc",
            "order_number": "OLJ2025021CM",
            "quantity": 20,
            "address": "Somolu street and bariga",
            "delivery_date": "2025-03-08 00:00:00",
            "delivery_type": "recurring",
            "status": "pending",
            "gas_price": "500.00",
            "total_amount": "10000.00",
            "created_at": "2025-02-19T16:17:47.000000Z"
        },
        {
            "slug": "7d9f22bc-a3ee-489b-9b46-f88369783cb1",
            "order_number": "OLJ2025029My",
            "quantity": 20,
            "address": "Somolu street and bariga",
            "delivery_date": "2025-03-08 00:00:00",
            "delivery_type": "recurring",
            "status": "cancelled",
            "gas_price": "500.00",
            "total_amount": "10000.00",
            "created_at": "2025-02-19T16:22:49.000000Z"
        }
    ]
}

export const orderDetails = {
    "status": true,
    "message": "Orders",
    "data": {
        "slug": "8bb9abe9-a650-40f8-bcb9-0521699e9386",
        "order_number": "OLJ202503UlD",
        "quantity": 20,
        "address": "3,Somolu street, bariga, Lagos state",
        "delivery_date": "2025-03-10 00:00:00",
        "delivery_type": "recurring",
        "status": "pending",
        "gas_price": "500.00",
        "total_amount": "500000.00",
        "order_history": 6,
        "created_at": "2025-03-10T07:20:13.000000Z",
        "payment_status": "pending",
        "credit_line_used": 0
    }
}

export const OrderscardContent: ICardContent[] = [
    {
        cardTitle: 'All Orders',
        Value: 200,
        icon: ListBullets
    },
    {
        cardTitle: 'Complete Orders',
        Value: 127,
        icon: CheckCircle
    },
    {
        cardTitle: 'Pending Orders',
        Value: 23,
        icon: ClockCountdown
    },
    {
        cardTitle: 'Recurring Orders',
        Value: 50,
        icon: Repeat
    }
];

export const TransactionscardContent: ICardContent[] = [
    {
        cardTitle: 'Total Amount Paid',
        Value: 293000,
        icon:  deliveryTruck
    },
    {
        cardTitle: 'Outstanding Balance',
        Value: 30000,
        icon: ClockCountdown
    },
    {
        cardTitle: 'Late Payment Fee',
        Value: 5000,
        icon: deliveryTruck
    },
];

export const DeliveriescardContent: ICardContent[] = [
    {
        cardTitle: 'All Deliveries',
        Value: 200,
        icon: deliveryTruck
    },
    {
        cardTitle: 'In Transit',
        Value: 50,
        icon: Repeat
    },
    {
        cardTitle: 'Pending Deliveries',
        Value: 23,
        icon: ClockCountdown
    },
    {
        cardTitle: 'Confirmed Deliveries',
        Value: 127,
        icon: ConfirmIcon
    },
    
    
];