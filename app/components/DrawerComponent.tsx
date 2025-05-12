import { Drawer } from "antd";
import { IoMdClose } from "react-icons/io";
import { DataTable } from "./DataTable";
import { StatusComponent } from "../orders/StatusComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { formatDateLong } from "../Utils/dateFormat";

interface IDrawerComponentProps<T>{
    columnsDetails: ColumnDef<T>[];
    onClose: () => void;
    open: boolean;
    data: T[];
	showPagination?: boolean
	panelTitle: string;
	panelTypeID: string;
	panelType: string;
}

interface IOrderDrawerContent<T> {
	data: T[]
}


export function OrderDrawerContent<T>({data}:IOrderDrawerContent<T>) {
	return(
		<div>
			<div className="w-full mt-3" >
				<span>Order details</span>
				
				<div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Order Date</span>
						<span className="text-gray-600">{formatDateLong(data[0].created_at)}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Order Status</span>
						<span>{StatusComponent(data[0].status)}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Order History</span>
						<span className="text-gray-600">23 previous orders</span>
					</div>
				</div>
			</div>
			<div className="w-full mt-8" >
				<span>Delivery details</span>
				
				<div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Delivery Date</span>
						<span className="text-gray-600">{formatDateLong(data[0].delivery_date)}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Delivery Address</span>
						<span>{data[0].address}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Delivery Status</span>
						<span>{StatusComponent(data[0].status)}</span>
					</div>
				</div>
			</div>
			<div className="w-full mt-8" >
				<span>Payment details</span>
				
				<div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Delivery Status</span>
						<span>{StatusComponent(data[0].status)}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Delivery Date</span>
						<span className="text-gray-600">November 9th, 2024</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Credit Line used</span>
						<span>0</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Amount paid</span>
						<span>{data[0].total_amount}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export function DeliveryDrawerContent<T>({data}:IOrderDrawerContent<T>) {
	return(
		<div>
			<div className="w-full mt-3">
				<span>Order Details</span>
				
				<div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
					{/* <div className="flex justify-between">
						<p className="font-medium text-gray-700">Order ID</p>
						<p className="text-gray-600">{formatDateLong(data[0].created_at)}</p>
					</div> */}
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Order Date</span>
						<span className="text-gray-600">{formatDateLong(data[0].created_at)}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Order Status</span>
						<span>{StatusComponent(data[0].status)}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Order History</span>
						<span className="text-gray-600">23 previous orders</span>
					</div>
				</div>
			</div>
			<div className="w-full mt-8" >
				<span>Delivery details</span>
				
				<div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Delivery Date</span>
						<span className="text-gray-600">{formatDateLong(data[0].delivery_date)}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Delivery Address</span>
						<span>{data[0].address}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium text-gray-700">Delivery Status</span>
						<span>{StatusComponent(data[0].status)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function DrawerComponent<T>({columnsDetails, 
	panelType, 
	onClose, open, panelTitle, panelTypeID, data, 
	showPagination}: IDrawerComponentProps<T>) {
    return(
        <Drawer 
			width={'650px'} 
			title={panelTitle}
			onClose={onClose} 
			open={open}
			closeIcon={false}
			extra={<IoMdClose cursor={'pointer'} className="w-6 h-6" onClick={onClose} />}
		>
			<div className="flex justify-between mb-9">
				<div className='flex flex-col space-y-2'>
					<h2 className="text-2xl font-semibold">{panelType} ID: {panelTypeID}</h2>
					<div className="flex space-x-2">{StatusComponent(data[0].status)}</div>
				</div>
				<Button variant='outline' 
					className="rounded-xl border-[var(--error-100)] 
					hover:bg-[var(--error-75)] hover:text-[var(--error-400)] 
					text-[var(--error-400)] py-2 px-[14px] 
					w-[113px] h-9 text-sm font-semibold"
				>
					Cancel Order
				</Button>
			</div>
			<DataTable showPagination={showPagination} columns={columnsDetails} data={data} />
			{panelType === 'order' ? (
					<OrderDrawerContent data={data} />
				) : panelType === 'delivery' ? (
					<DeliveryDrawerContent data={data} />
				) : panelType === 'transaction' ? (
					<div>
						<div>Transaction details will be displayed here.</div>
					</div>
				) : null
			}
		</Drawer>
    )
}