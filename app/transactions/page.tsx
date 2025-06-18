'use client';
import { ConfigProvider, Drawer, Tabs, TabsProps } from "antd";
import Cards from "../components/Cards";
import DashboardNavigation from "../components/DashboardNavigation";
import DashboardLayout from "../Layouts/DashboardLayout";
import { TransactionscardContent } from "../orders/Data";
import TabContent from "../orders/TabContent";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusComponent } from "../orders/StatusComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateLong } from "../Utils/dateFormat";
import { useState } from "react";
import { ITransaction } from "../Types/Interfaces/ITransactions";
import { IoMdClose } from "react-icons/io";
import { DataTable } from "../components/DataTable";
import Dispute from "./dispute";
import { useGetTransactionsQuery } from "../Services/transaction";

export default function Transactions() {
    const [open, setOpen] = useState(false);
    const [openDispute, setOpenDispute] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ITransaction | null>(null)
    const {data} = useGetTransactionsQuery();


    const showDrawer = () => {
        setOpen(true);
    };
    
    const onClose = () => {
        setOpen(false);
    };

    const showDispute = () => {
        setOpenDispute(true);
    };

    const onCloseDispute = () => {
        setOpenDispute(false);
    };


    const drawerColumns: ColumnDef<ITransaction>[] = [
            
        {
          accessorKey: "order_number",
          header: "Order ID",
        },
        {
            header: () => <div className="text-right">Quantity</div>,
            accessorFn: row => row.meta.quantity,
            id: "quantity",
            cell: ({ row }) => (
              <div className="text-right">
                {row.getValue("quantity")}kg
              </div>
            ),
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
            accessorKey: "amount",
            header: () => <div className="text-right">Total Amount</div>,
            cell: ({ row }) => (
                <div className="text-right">
                    #{row.getValue("amount")}
                </div>
            ),
        }
    ]

    const columns: ColumnDef<ITransaction>[] = [
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
		  accessorKey: "reference",
		  header: "Transaction ID",
		},
		{
		  accessorKey: "created_at",
		  header: "Transaction Date",
		  cell: ({ row }) => (
				<div>
					{formatDateLong(row.getValue("created_at"))}
				</div>
			)
		},
		{
		  accessorKey: "description",
		  header: "Description/Type",
		  
		},
		{
			accessorKey: "amount",
			header: () => <div className="text-right">Total Amount</div>,
			cell: ({ row }) => (
				<div className="text-right">
					#{row.getValue("amount")}
				</div>
			),
		},
        {
            accessorKey: "payment_method",
            header: "Payment Method",
            
        },
		{
			accessorKey: "status",
			header: "Payment Status",
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
							
							View Transaction
							
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
                label: 'All Transactions',
                children: <TabContent data={data?.data} columns={columns}  onRowClick={(row) => {
                    setSelectedItem(row);
                    setOpen(true);
                  }}  />,
            },
            {
                key: '2',
                label: 'Processing',
                children: <TabContent data={data?.data} columns={columns} status="pending" onRowClick={(row) => {
                    setSelectedItem(row);
                    setOpen(true); 
                 }} />,
            },
            {
                key: '3',
                label: 'Failed',
                children: <TabContent data={data?.data} columns={columns} status="cancelled" onRowClick={(row) => {
                    setSelectedItem(row);
                    setOpen(true); 
                 }} />,
            },
            {
                key: '4',
                label: 'Successful',
                children: <TabContent data={data?.data} columns={columns}  status="completed" onRowClick={(row) => {
                    setSelectedItem(row);
                    setOpen(true); 
                 }} />,
            }
        ];
    return(
        <DashboardLayout>
            <div className=" flex flex-col w-full gap-6 bg-white h-full p-8 rounded-[20px]">
				<DashboardNavigation title="Transactions"  isVisible={false}/>
                <div className="grid grid-cols-4 gap-4 mt-4">
                    <Cards 
                        backgroundGradient="bg-custom-radial-orange"
                        content={TransactionscardContent[0]}
                        showCards={false}
                        data={''}
                    />
                    <Cards 
                        backgroundGradient="bg-custom-radial-green"
                        content={TransactionscardContent[1]}
                        showCards={false}
                        data={''}
                    />
                    <Cards 
                        backgroundGradient="bg-custom-radial-yellow"
                        content={TransactionscardContent[2]}
                        showCards={false}
                        data={''}
                    />
                    {/* <Cards 
                        backgroundGradient="bg-custom-radial-blue"
                        content={TransactionscardContent[3]}
                        showCards={false}
                    /> */}
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
            <Drawer
                width="650px"
                title={'Transactions'}
                onClose={onClose}
                open={open}
                closeIcon={false}
                extra={<IoMdClose className="w-6 h-6 cursor-pointer" onClick={onClose} />}
            >

                <div className="flex justify-between mb-9">
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl font-semibold">Transaction ID: {selectedItem?.reference}</h2>
                        <div className="flex space-x-2">{StatusComponent(selectedItem?.status)}</div>
                    </div>
                    <Button
                        variant="outline"
                        className="rounded-xl border-[var(--gray-200)]  
                        text-[var(--gray-600)] py-2 px-[14px] w-auto h-9 text-sm font-semibold"
                        onClick={showDispute}
                        >
                        Dispute Transaction
                    </Button>
                </div>
                <DataTable showPagination={false} columns={drawerColumns} data={selectedItem ? [selectedItem] : []}  />
                <div className="w-full mt-3" >
                    <span className="font-bold">Order details</span>
                    
                    <div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Order ID</span>
                            <span className="text-gray-600 font-semibold">{selectedItem?.meta.order_number}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Order Date</span>
                            <span className="text-gray-600 font-semibold">{formatDateLong(selectedItem?.created_at)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Order Status</span>
                            <span>{StatusComponent(selectedItem?.status)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Order History</span>
                            <span className="text-gray-600 font-semibold">23 previous orders</span>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-3" >
                    <span className="font-bold">Payment details</span>
                    
                    <div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Payment Status</span>
                            <span>{StatusComponent(selectedItem?.status)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Payment Date</span>
                            <span className="text-gray-600 font-semibold">{formatDateLong(selectedItem?.created_at)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Amount Paid</span>
                            <span className="text-gray-600 font-semibold">#{selectedItem?.amount}</span>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-3" >
                    <span className="font-bold">Payment overview</span>
                    
                    <div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Quantity</span>
                            <span className="text-gray-600 font-semibold">{selectedItem?.meta.quantity}KG</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Price Per KG</span>
                            <span className="text-gray-600 font-semibold">#{selectedItem?.meta.amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Sub total</span>
                            <span className="text-gray-600 font-semibold">#450,0000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Delivery fee</span>
                            <span className="text-gray-600 font-semibold">#4,000</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">VAT</span>
                            <span className="text-gray-600 font-semibold">#40.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-700">Total</span>
                            <span className="text-gray-600 font-semibold">#450,040.00</span>
                        </div>
                    </div>
                </div>
            </Drawer>
            <Dispute onCloseDispute={onCloseDispute} openDispute={openDispute} selectedItem={selectedItem} />
        </DashboardLayout>
    )
}