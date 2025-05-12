'use client';

import DashboardLayout from "../Layouts/DashboardLayout";

import React, { useEffect, useState } from 'react';
import {ConfigProvider, Flex, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Cards from "../components/Cards";
import { OrderscardContent, data } from "./Data";
import TabContent from "./TabContent";
import DrawerComponent from "../components/DrawerComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../Types/Interfaces/IOrders";
import CreateOrder from "./CreateOrders/createOrders";
import DashboardNavigation from "../components/DashboardNavigation";
import { MoreHorizontal} from "lucide-react"
import { formatDateLong } from "../Utils/dateFormat";
import { StatusComponent } from "./StatusComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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



export default function Orders() {
	const [isMounted, setIsMounted] = useState(false);
	const [open, setOpen] = useState(false);
	const [isCreateOrder, setCreateOrder] = useState(false);
    
    const showDrawer = () => {
        setOpen(true);
    };
    
    const onClose = () => {
        setOpen(false);
    };

	const handleCreateOrder = () => {
		setCreateOrder(true);
	}

	const onCloseOrder = () => {
        setCreateOrder(false);
    };

  
	useEffect(() => {
	  setIsMounted(true);
	}, []);
  
	if (!isMounted) return null;

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
		  accessorKey: "created_at",
		  header: "Order Date",
		  cell: ({ row }) => (
				<div>
					{formatDateLong(row.getValue("created_at"))}
				</div>
			)
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
		},
		{
			accessorKey: "status",
			header: "Order Status",
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
							
							View Order
							
						</DropdownMenuItem>
						<DropdownMenuItem className="text-xs mb-[10px] font-normal text-[var(--gray-500)]">Modify Order</DropdownMenuItem>
						<DropdownMenuItem className="text-xs font-normal text-[var(--gray-500)]">Cancel Order</DropdownMenuItem>
				  </DropdownMenuContent>
				</DropdownMenu>
			  )
			},
		},
	]

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'All orders',
			children: <TabContent columns={columns} showDrawer={showDrawer} />,
		},
		{
			key: '2',
			label: 'Completed',
			children: <TabContent columns={columns} showDrawer={showDrawer} status="completed" />,
		},
		{
			key: '3',
			label: 'Pending',
			children: <TabContent columns={columns} showDrawer={showDrawer} status="pending" />,
		},
		{
			key: '4',
			label: 'Cancelled',
			children: <TabContent columns={columns} showDrawer={showDrawer} status="cancelled" />,
		},
		{
			key: '5',
			label: 'Recurring',
			children: <TabContent columns={columns} showDrawer={showDrawer}  status="recurring"/>,
		},
	];

    return(
        <DashboardLayout>
            <div className=" flex flex-col w-full gap-6 bg-white h-full p-8 rounded-[20px]">
                <DashboardNavigation title="Orders" handleCreateOrder={handleCreateOrder} isVisible/>
                <Flex className="flex gap-4 justify-between mt-4">
					<Cards 
						backgroundGradient="bg-custom-radial-orange"
						content={OrderscardContent[0]}
					/>
					<Cards 
						backgroundGradient="bg-custom-radial-green"
						content={OrderscardContent[1]}
					/>
					<Cards 
						backgroundGradient="bg-custom-radial-yellow"
						content={OrderscardContent[2]}
					/>

					<Cards 
						backgroundGradient="bg-custom-radial-neon"
						content={OrderscardContent[3]}
					/>
                </Flex>
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
				panelTitle="Order Details" 
				panelType="order" 
				panelTypeID="#1234HG" 
				columnsDetails={columnsDetails} 
				onClose={onClose } 
				open={open} data={data.data}
				showPagination={false} 
			/>
			<CreateOrder isCreateOrder={isCreateOrder} onCloseOrder={onCloseOrder} />
        </DashboardLayout>
    )
}