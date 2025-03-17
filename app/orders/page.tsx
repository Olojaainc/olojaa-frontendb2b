'use client';
import Image from "next/image";
import DashboardLayout from "../Layouts/DashboardLayout";
import File from '@/public/File.svg'
import React, { useEffect, useState } from 'react';
import {ConfigProvider, Flex, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Cards from "../components/Cards";
import { cardContent, data } from "./Data";
import TabContent from "./TabContent";
import DrawerComponent from "../components/DrawerComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../Types/Interfaces/IOrders";

const columnsDetails: ColumnDef<Order>[] = [
			
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
    
    const showDrawer = () => {
        setOpen(true);
    };
    
    const onClose = () => {
        setOpen(false);
    };

  
	useEffect(() => {
	  setIsMounted(true);
	}, []);
  
	if (!isMounted) return null;

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'All orders',
			children: <TabContent showDrawer={showDrawer} />,
		},
		{
			key: '2',
			label: 'Completed',
			children: <TabContent showDrawer={showDrawer} status="completed" />,
		},
		{
			key: '3',
			label: 'Pending',
			children: <TabContent showDrawer={showDrawer} status="pending" />,
		},
		{
			key: '4',
			label: 'Cancelled',
			children: <TabContent showDrawer={showDrawer} status="cancelled" />,
		},
		{
			key: '5',
			label: 'Recurring',
			children: <TabContent showDrawer={showDrawer}  status="recurring"/>,
		},
	];

    return(
        <DashboardLayout>
            <div className=" flex flex-col w-full bg-white h-full p-8 rounded-[20px]">
                <div className="flex justify-between w-full">
                    <p className="font-semibold text-xl"> Orders</p>
                    <div className="flex justify-between w-[250px]">
                        <button className="flex items-center justify-center bg-transparent text-[var(--gray-600] font-semibold w-[122px] h-[36px] border border-[var(--gray-200)] rounded-xl p-1 text-sm">
                            <Image src={File} width={20} height={20}  alt="file icon" />
                            Export CSV
                        </button>
                        <button className="bg-[var(--primary-400)] font-semibold text-white w-[122px] h-[36px] rounded-xl p-1 text-sm">Make an Order</button>
                    </div>
                </div>
                <Flex className="flex justify-between mt-4">
					<Cards 
						backgroundGradient="bg-custom-radial-orange"
						content={cardContent[0]}
					/>
					<Cards 
						backgroundGradient="bg-custom-radial-green"
						content={cardContent[1]}
					/>
					<Cards 
						backgroundGradient="bg-custom-radial-yellow"
						content={cardContent[2]}
					/>

					<Cards 
						backgroundGradient="bg-custom-radial-neon"
						content={cardContent[3]}
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
			<DrawerComponent columnsDetails={columnsDetails} onClose={onClose } open={open} data={data.data} />
        </DashboardLayout>
    )
}