import { useState } from "react";
import { data } from "./Data";
import { DataTable } from "../components/DataTable";
import { SearchOutlined} from '@ant-design/icons';
import { TbArrowsSort } from "react-icons/tb";
import { Input, Flex } from 'antd';
import { Check} from "lucide-react"
import Filter from "./Filter";
import { Button } from "@/components/ui/button";
import { MoreHorizontal} from "lucide-react"
import { formatDateLong } from "../Utils/dateFormat";
import { StatusComponent } from "./StatusComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox"
import { Order } from "../Types/Interfaces/IOrders";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ITabContent {
	status?: string
	showDrawer:() => void;
}

export default function TabContent({status, showDrawer}: ITabContent) {
	const [sortOption, setSortOption] = useState("low-to-high");

	const filteredOrders = status
		? data.data.filter((order) => order.status === status)
		: data.data; 

	const sortedOrders = [...filteredOrders].sort((a, b) => {
		switch (sortOption) {
		  case "low-to-high":
			return parseFloat(a.total_amount) - parseFloat(b.total_amount);
		  case "high-to-low":
			return parseFloat(b.total_amount) - parseFloat(a.total_amount);
		  case "popularity":
			return b.quantity - a.quantity;
		  case "latest":
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
		  case "newest":
			return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
		  default:
			return 0;
		}
	});

	const sort = [
		{ value: "low-to-high", label: "Price: Low - High" },
		{ value: "high-to-low", label: "Price: High - Low" },
		{ value: "popularity", label: " Sort byPopularity" },
		{ value: "latest", label: "Sort by Latest" },
		{ value: "newest", label: "Sort by Newest" },
	]

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

	return(
		<Flex gap={'12px'} className="flex-col">
			<Flex gap={'8px'}>
				<Input placeholder="Search" prefix={<SearchOutlined />} className="w-[296px] rounded-xl border-[0.96px] placeholder:text-[#475467] " />
				<Flex gap={'8px'}>
					<Filter />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="flex bg-transparent text-black hover:bg-[var(--gray-75)] border shadow-none rounded-xl py-2 px-[14px] w-[90px] h-9 text-sm font-semibold ">
								<TbArrowsSort className=" w-5 h-5" />
								Sort
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="min-w-[160px] h-[220px] rounded-2xl flex flex-col justify-center" align="end">
							{sort.map((option) => (
								<DropdownMenuItem
									key={option.value}
									onClick={() => setSortOption(option.value)}
									className={`flex items-center mb-[10px] p-2 rounded-[8px] text-xs cursor-pointer hover:bg-gray-200 ${sortOption === option.value ? "bg-gray-200 border rounded-[8px] h-7 font-semibold" : ""}`}
								>
									{option.label}
									{sortOption === option.value && <Check className="w-4 h-4 text-black" />}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</Flex>
			</Flex>
			<DataTable columns={columns} data={sortedOrders} />
		</Flex>
	)
}