'use client';
import { ConfigProvider, Tabs, TabsProps } from "antd";
import Cards from "../components/Cards";
import DashboardNavigation from "../components/DashboardNavigation";
import DashboardLayout from "../Layouts/DashboardLayout";
import { DeliveriescardContent } from "../orders/Data";
import TabContent from "../orders/TabContent";
import { useState } from "react";
import DrawerComponent from "../components/DrawerComponent";
// import { columnsDetails } from "../orders/page";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../Types/Interfaces/IOrders";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateLong } from "../Utils/dateFormat";
import { StatusComponent } from "../orders/StatusComponent";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { orderConstant } from "../Constants/Orders";


export default function Deliveries() {
    const [open, setOpen] = useState(false);
        const [selectedItem, setSelectedItem] = useState<Order | null>(null)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const columns: ColumnDef<Order>[] = [
        {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                className="border-[var(--gray-200)]"
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                  className="border-[var(--gray-200)]"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
          accessorKey: "order_number",
          header: "Order ID",
        },
        {
          accessorKey: "delivery_date",
          header: "Delivery Date",
          cell: ({ row }) => (
                <div>
                    {formatDateLong(row.getValue("delivery_date"))}
                </div>
            )
        },
        {
            accessorKey: "address",
            header:() => <div>Delivery Address</div>,
            cell: ({ row }) => (
                <div >
                    {row.getValue("address")}
                </div>
            )
        },
        {
            accessorKey: "status",
            header: "Delivery Status",
            cell: ({ row }) => (
                StatusComponent(row.getValue("status"))
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: () => {
                
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                        <Button variant={'outline'}  className="h-5 w-5 text-[var(--gray-500)] border-none bg-none hover:bg-none shadow-none p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-[80px] h-[135px] rounded-2xl flex flex-col justify-center" align="end">
                        <DropdownMenuItem
                            onClick={showDrawer} className="text-xs mb-[10px] font-normal text-[var(--gray-500)]"
                        >
                            
                            View Details
                            
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs mb-[10px] font-normal text-[var(--gray-500)]">Track Delivery</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-normal text-[var(--gray-500)]">Reschedule Delivery</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
        },
    ]


    const Drawercolumns: ColumnDef<Order>[] = [

        {
          accessorKey: "order_number",
          header: "Delivery ID",
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
    
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'All Deliveries',
            children: <TabContent data={orderConstant} columns={columns} onRowClick={(row) => {
                setSelectedItem(row);
                setOpen(true); 
             }} />,
        },
        {
            key: '2',
            label: 'Pending',
            children: <TabContent data={orderConstant} columns={columns}  status="Pending" onRowClick={(row) => {
                setSelectedItem(row);
                setOpen(true); 
             }} />,
        },
        {
            key: '3',
            label: 'In Transit',
            children: <TabContent data={orderConstant} columns={columns}  status="transit" onRowClick={(row) => {
                setSelectedItem(row);
                setOpen(true); 
             }} />,
        },
        {
            key: '4',
            label: 'Cancelled',
            children: <TabContent data={orderConstant} columns={columns} status="cancelled" onRowClick={(row) => {
                setSelectedItem(row);
                setOpen(true); 
             }} />,
        },
        {
            key: '5',
            label: 'Recurring',
            children: <TabContent data={orderConstant} columns={columns}  status="recurring" onRowClick={(row) => {
                setSelectedItem(row);
                setOpen(true); 
             }} />,
        },
        {
            key: '6',
            label: 'Delivered',
            children: <TabContent data={orderConstant} columns={columns}  status="delivered" onRowClick={(row) => {
                setSelectedItem(row);
                setOpen(true); 
             }} />,
        },
    ];
    return(
        <DashboardLayout>
            <div className=" flex flex-col w-full gap-6 bg-white h-full p-8 rounded-[20px]">
                <DashboardNavigation title="Deliveries" isVisible={false}/>
                <div className="flex gap-4 items-center justify-between mt-4">
                    <Cards 
                        backgroundGradient="bg-custom-radial-orange"
                        content={DeliveriescardContent[0]}
                    />
                    <Cards 
                        backgroundGradient="bg-custom-radial-green"
                        content={DeliveriescardContent[1]}
                    />
                    <Cards 
                        backgroundGradient="bg-custom-radial-yellow"
                        content={DeliveriescardContent[2]}
                    />

                    <Cards 
                        backgroundGradient="bg-custom-radial-neon"
                        content={DeliveriescardContent[3]}
                    />
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                            itemColor: "#6B7280", 
                            itemSelectedColor: "#374151",
                            itemHoverColor: "#374151", 
                            itemActiveColor: "#374151", 
                            inkBarColor: "#FF6A00", 
                            },
                        },
                    }}
                >
                    <Tabs defaultActiveKey="1" items={items} />
                </ConfigProvider>
            </div>
            <DrawerComponent 
                panelTitle="Delivery Details" 
                panelType="delivery" 
                panelTypeID={selectedItem?.order_number} 
                showPagination={false} 
                columnsDetails={Drawercolumns} 
                onClose={onClose } 
                open={open} data={selectedItem} 
            />
        </DashboardLayout>
    )
}