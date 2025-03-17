import { Drawer } from "antd";
import { IoMdClose } from "react-icons/io";
import { DataTable } from "./DataTable";
import { StatusComponent } from "../orders/StatusComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface IDrawerComponentProps<T>{
    columnsDetails: ColumnDef<T>[];
    onClose: () => void;
    open: boolean;
    data: T[]
}

export default function DrawerComponent<T>({columnsDetails, onClose, open, data}: IDrawerComponentProps<T>) {
    return(
        <Drawer 
			width={'650px'} 
			title="Order Details" 
			onClose={onClose} 
			open={open}
			closeIcon={false}
            // loading={true}
			extra={<IoMdClose cursor={'pointer'} className="w-6 h-6" onClick={onClose} />}
		>
			<div className="flex justify-between mb-9">
				<div className='flex flex-col space-y-2'>
					<h2 className="text-2xl font-semibold">Order ID: #1234HG</h2>
					<div className="flex space-x-2">{StatusComponent('completed')} {StatusComponent('pending')}</div>
				</div>
				<Button variant='outline' className="rounded-xl border-[var(--error-100)] hover:bg-[var(--error-75)] hover:text-[var(--error-400)] text-[var(--error-400)] py-2 px-[14px] w-[113px] h-9 text-sm font-semibold">Cancel Order</Button>
			</div>
			<DataTable columns={columnsDetails} data={data} />
			<div className="w-full mt-3" >
				<p>Order details</p>
				
				<div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Order Date</p>
						<p className="text-gray-600">November 9th, 2024</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Order Status</p>
						<p>{StatusComponent('pending')}</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Order History</p>
						<p className="text-gray-600">23 previous orders</p>
					</div>
				</div>
			</div>
			<div className="w-full mt-8" >
				<p>Delivery details</p>
				
				<div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Delivery Date</p>
						<p className="text-gray-600">November 9th, 2024</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Delivery Address</p>
						<p>No 5. Arigidi street, Gbogan road Ibadan</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Delivery Status</p>
						<p>{StatusComponent('pending')}</p>
					</div>
				</div>
			</div>
			<div className="w-full mt-8" >
				<p>Payment details</p>
				
				<div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Delivery Status</p>
						<p>{StatusComponent('pending')}</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Delivery Date</p>
						<p className="text-gray-600">November 9th, 2024</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Credit Line used</p>
						<p>0</p>
					</div>
					<div className="flex justify-between">
						<p className="font-medium text-gray-700">Amount paid</p>
						<p>#450,000</p>
					</div>
				</div>
			</div>
		</Drawer>
    )
}