'use client'
import { getErrorMessage } from "@/app/hooks/getError";
import OrderChart from "./Piechart"
import { useGetOrderManagementQuery } from "@/app/Services/orders"
import { useEffect } from "react";
import { toast } from "sonner";

export default function OrderManagement() {
    const { data: orderManagementData, isLoading, isError, error } = useGetOrderManagementQuery();

    useEffect(() => {
        if (isError || error ) {
            const errorMessage = getErrorMessage(error);
            toast.error("Error Occured!", {
                description: errorMessage,
            });
        }
    }, [isError, error]);

    return(
        <div className="flex flex-col w-full h-[458px] mt-4 mb-6 px-3 rounded-2xl bg-white">
            <p className="text-sm text-[var(--gray-900)] mt-4 mb-3 font-semibold">Order Management</p>
            <hr />
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-around items-center mt-6 w-full">
                    <div className="flex items-center justify-between">
                        <div className="bg-[#C4B5FD] mr-2 w-2 h-2 rounded-full"></div>
                        <p className="text-sm text-[var(--gray-400)] ">Completed</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="bg-[#F5B547] mr-2 w-2 h-2 rounded-full"></div>
                        <p className="text-sm text-[var(--gray-400)] ">Pending</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="bg-[#9CA3AF] mr-2 w-2 h-2 rounded-full"></div>
                        <p className="text-sm text-[var(--gray-400)] ">Rejected</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="bg-[#60A5FA] mr-2 w-2 h-2 rounded-full"></div>
                        <p className="text-sm text-[var(--gray-400)] ">Recurring</p>
                    </div>
                </div>
                <OrderChart orderData={orderManagementData?.data} />
                <div className="flex w-full items-start justify-evenly mb-8">
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold text-[var(--gray-900)]">
                            {isLoading ? "..." : orderManagementData?.data?.completedOrders || 0}
                        </p>
                        <p className="text-xs text-[var(--gray-600)]">Completed</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold text-[var(--gray-900)]">
                            {isLoading ? "..." : orderManagementData?.data?.pendingOrders || 0}
                        </p>
                        <p className="text-xs text-[var(--gray-600)]">Pending</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold text-[var(--gray-900)]">
                            {isLoading ? "..." : orderManagementData?.data?.rejectedOrders || 0}
                        </p>
                        <p className="text-xs text-[var(--gray-600)]">Rejected</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-lg font-semibold text-[var(--gray-900)]">
                            {isLoading ? "..." : orderManagementData?.data?.recurringOrders || 0}
                        </p>
                        <p className="text-xs text-[var(--gray-600)]">Recurring</p>
                    </div>
                </div>
            </div>
        </div>
    )
}