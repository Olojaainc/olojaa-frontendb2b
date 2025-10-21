'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../Layouts/DashboardLayout";
import CreateOrder from "../orders/CreateOrders/createOrders";
import OrderManagement from "./Components/OrderManagement";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { useGetTransactionsQuery } from "@/app/Services/transaction";
import { useGetOrderManagementQuery } from "@/app/Services/orders";
import { TransactionFilterType } from "@/app/Types/Interfaces/ITransactions";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { getErrorMessage } from "../hooks/getError";
import { toast } from "sonner";
import { getFilterDisplayText } from "../Utils/dateFormat";

export default function Dashboard() {
    const router = useRouter();
    const [isCreateOrder, setCreateOrder] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [transactionFilter, setTransactionFilter] = useState<{
        filter?: TransactionFilterType;
        from?: string;
        to?: string;
    }>({ filter: undefined });


    const { data: transactionsData, isLoading: isTransactionsLoading,
        isError:isTransactionsError, error: transactionsError 
    } = useGetTransactionsQuery(transactionFilter, {skip: !transactionFilter});

    const { data: orderManagementData, isLoading: isOrderManagementLoading,
        isError: isOrderManagementError, error: orderManagementError 
    } = useGetOrderManagementQuery();

	

    useEffect(() => {
        if (isTransactionsError || transactionsError ) {
            const errorMessage = getErrorMessage(transactionsError);
            toast.error("Error Occured!", {
                description: errorMessage,
            });
        }
    }, [isTransactionsError, transactionsError]);

    useEffect(() => {
        if (isOrderManagementError || orderManagementError ) {
            const errorMessage = getErrorMessage(orderManagementError);
            toast.error("Order Management Error!", {
                description: errorMessage,
            });
        }
    }, [isOrderManagementError, orderManagementError]);
    
    
    const handleCreateOrder = () => {
		setCreateOrder(true);
	}

    const handleFilterChange = (filter: TransactionFilterType, dateRange?: DateRange) => {
        if (filter === "date_range" && dateRange?.from && dateRange?.to) {
            setTransactionFilter({
                filter: "date_range",
                from: format(dateRange.from, "yyyy-MM-dd"),
                to: format(dateRange.to, "yyyy-MM-dd")
            });
        } else {
            setTransactionFilter({ filter });
        }
    };

	const onCloseOrder = () => {
        setCreateOrder(false);
    };
    return(
        <DashboardLayout>
           <div className="flex justify-between p-2 mb-6">
                <div>
                    <h3 className="font-semibold text-lg text-[var(--gray-900)]">Good Morning,</h3>
                    <p className="font-medium text-sm text-[var(--gray-400)] ">Monday, January 6, 2025</p>
                </div>
                <div className="mb-4">
                    <DateRangePicker 
                        date={dateRange} 
                        onDateChange={setDateRange} 
                        onFilterChange={handleFilterChange}
                        placeholder="Yesterday" 
                        className=" placeholder:text-black placeholder:font-semibold "
                    />
                </div>
           </div>
           <div className="flex justify-between mb-4 gap-6">
                <div className="flex flex-col items-start justify-between w-full h-[160px]  bg-white rounded-3xl py-4 px-3 shadow-sm">
                    <p className="text-xs mb-2 text-[var(--gray-600)]">Total Transactions</p>
                    <div className="text-lg mb-2 font-semibold text-[var(--gray-900)]">
                        {isTransactionsLoading ? <Skeleton className="h-4 w-12" />  : transactionsData?.meta.total_transactions || 0}
                    </div>
                    <div className="flex mb-2 items-center">
                        
                        <p  className={`custom-border font-medium rounded-xl py-[2px] px-[8px] text-sm mr-1 ${
                            (transactionsData?.meta.percentage_change || 0) >= 0 
                                ? 'bg-[#E9F7ED] text-[var(--success-400)]' 
                                : 'bg-[#FBEAE9]  text-[var(--error-400)] '
                        }`}>{transactionsData?.meta.percentage_change}%</p>
                        
                        <p className="text-xs">
                            vs {
                                transactionFilter.filter === "date_range" && dateRange?.from && dateRange?.to
                                    ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                                    : getFilterDisplayText(transactionFilter.filter)
                            }
                        </p>
                    </div>
                    <button onClick={() => router.push('/transactions')} className="border border-[#D1D5DB] text-sm font-semibold rounded-xl px-[14px] py-2">see full details</button>
                </div>
                <div className="flex flex-col items-start justify-between w-full h-[160px] bg-white rounded-3xl py-4 px-3 shadow-sm">
                    <p className="text-xs mb-2 text-[var(--gray-600)]">Pending Deliveries</p>
                    <p className="text-lg mb-2 font-semibold text-[var(--gray-900)]">500KG</p>
                    <div className="flex mb-2 items-center">
                        
                        <p  className="custom-border bg-[#E9F7ED] text-[var(--success-400)] font-medium rounded-xl py-[2px] px-[8px] text-sm mr-1">+30%</p>
                        
                        <p className="text-xs">vs yesterday</p>
                    </div>
                    <button onClick={() => router.push('/deliveries')} className="border border-[#D1D5DB] text-sm font-semibold rounded-xl px-[14px] py-2">see full details</button>
                </div>
           </div>
           <div className="bg-custom-radial flex items-center justify-between border-[0.5px] shadow-sm rounded-2xl px-3 py-4">
                <div>
                    <p className="text-xs mb-2 text-[var(--gray-600)]">Total Orders</p>
                    <div className="text-lg mb-2 font-semibold text-[var(--gray-900)]">
                        {isOrderManagementLoading ? <Skeleton className="h-4 w-12" /> : 
                            (orderManagementData?.data?.totalOrders || 0)
                        }
                    </div>
                    <div className="flex mb-2 items-center">
                        
                        <p  className="custom-border bg-[#FBEAE9] text-[var(--error-400)] font-medium rounded-xl py-[2px] px-[8px] text-sm mr-1">-3%</p>
                        
                        <p className="text-xs">vs yesterday</p>
                    </div>
                </div>
                <button onClick={handleCreateOrder} className="bg-[var(--primary-400)] text-white w-[122px] h-[36px] rounded-xl p-1 text-sm">Make an Order</button>
           </div>
           <div className="flex flex-wrap gap-6 justify-between">
                {/* <CreditLine /> */}
                <OrderManagement />
           </div>
           <CreateOrder isCreateOrder={isCreateOrder} onCloseOrder={onCloseOrder} />
        </DashboardLayout>
        
    )
}