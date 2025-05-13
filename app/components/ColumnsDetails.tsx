import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../Types/Interfaces/IOrders";

export const columnsDetails: ColumnDef<Order>[] = [
            
    {
      accessorKey: "order_number",
      header: "Order ID",
    },
    {
        accessorKey: "quantity",
        header:() => <div className="text-right">Quantity</div>,
        cell: ({ row }) => (
            <div className="text-right">
                {row.getValue("quantity")}kg
            </div>
        )
    },
    {
        accessorKey: "gas_price",
        header: () => <div className="text-right">Price Per KG</div>,
        cell: ({ row }) => (
            <div className="text-right">
                #{row.getValue("gas_price")}
            </div>
        ),
    },
    {
        accessorKey: "total_amount",
        header: () => <div className="text-right">Total Amount</div>,
        cell: ({ row }) => (
            <div className="text-right">
                #{row.getValue("total_amount")}
            </div>
        ),
    }
]