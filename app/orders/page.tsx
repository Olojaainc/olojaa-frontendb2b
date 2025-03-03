'use client';
import Image from "next/image";
import DashboardLayout from "../Layouts/DashboardLayout";
import File from '@/public/File.svg'
import React from 'react';
import { Button, Flex, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { SearchOutlined} from '@ant-design/icons';
import { IoFilter } from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";
import ListBullets from '@/public/ListBulletsBlack.svg';
import CheckCircle from '@/public/CheckCircle.svg';
import ClockCountdown from '@/public/ClockCountdown.svg';
import Repeat from '@/public/Repeat.svg';
import { Input } from 'antd';
import { ICardContent } from "../Types/Interfaces/ICard";
import Cards from "../components/Cards";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox"
import { Order } from "../Types/Interfaces/IOrders";
import { DataTable } from "../components/DataTable";
import { data } from "./Data";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
// import { Button } from "@/components/ui/button"
  


export const columns: ColumnDef<Order>[] = [
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
	},
	{
	  accessorKey: "delivery_date",
	  header: "Delivery Date",
	},
	{
		accessorKey: "quantity",
		header: "Quantity",
	},
	{
		accessorKey: "gas_price",
		header: "Price Per KG",
	},
	{
		accessorKey: "total_amount",
		header: "Total Amount",
	},
	{
		accessorKey: "status",
		header: "Order Status",
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
		//   const payment = row.original
	 
		  return (
			<DropdownMenu>
			  <DropdownMenuTrigger asChild>
					<Button  className="h-5 w-5 text-[var(--gray-500)] p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal />
					</Button>
			  </DropdownMenuTrigger>
			  <DropdownMenuContent className="min-w-[80px] h-[125px] rounded-2xl justify-center" align="center">
					{/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
					<DropdownMenuItem
						className="text-xs mb-[14px] font-medium text-[var(--gray-500)]"
					//   onClick={() => navigator.clipboard.writeText(payment.id)}
					>
						View Order
					</DropdownMenuItem>
					{/* <DropdownMenuSeparator /> */}
					<DropdownMenuItem className="text-xs mb-[14px] font-medium text-[var(--gray-500)]">Modify Order</DropdownMenuItem>
					<DropdownMenuItem className="text-xs font-medium text-[var(--gray-500)]">Cancel Order</DropdownMenuItem>
			  </DropdownMenuContent>
			</DropdownMenu>
		  )
		},
	},
]

function TabContent() {
	
	return(
		<Flex gap={'12px'} className="flex-col">
			<Flex gap={'8px'}>
				<Input placeholder="Search" prefix={<SearchOutlined />} className="w-[296px] rounded-xl border-[0.96px] placeholder:text-[#475467] "/>
				<Flex gap={'8px'}>
					<Button icon={<IoFilter className=" w-5 h-5 mt-1" />} className="rounded-xl py-2 px-[14px] w-[90px] h-9 text-sm font-semibold">
						Filter
					</Button>
					<Button icon={<TbArrowsSort className=" w-5 h-5 mt-1" />} className="rounded-xl py-2 px-[14px] w-[90px] h-9 text-sm font-semibold ">
						Sort
					</Button>
				</Flex>
			</Flex>
			<DataTable columns={columns} data={data.data} />
		</Flex>
	)
}

export default function Orders() {

	const onChange = (key: string) => {
	console.log(key);
	};

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'All orders',
			children: <TabContent />,
		},
		{
			key: '2',
			label: 'Completed',
			children: <TabContent />,
		},
		{
			key: '3',
			label: 'Pending',
			children: <TabContent />,
		},
		{
			key: '4',
			label: 'Cancelled',
			children: <TabContent />,
		},
		{
			key: '5',
			label: 'Recurring',
			children: <TabContent />,
		},
	];

	const cardContent: ICardContent[] = [
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
				<Tabs defaultActiveKey="1" items={items} onChange={onChange} className="mt-6" />
            </div>
        </DashboardLayout>
    )
}