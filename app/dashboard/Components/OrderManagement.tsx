'use client'
import OrderChart from "./Piechart"

export default function OrderManagement() {
    return(
        <div className="flex flex-col w-[376px] h-[458px] mt-4 mb-6 px-3 rounded-2xl bg-white">
            <p className="text-sm text-[var(--gray-900)] mt-4 mb-3 font-semibold">Order Management</p>
            <hr />
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-around items-center mt-6 w-full">
                    <div className="flex items-center justify-between">
                        <div className="bg-[var(--violet-200)] mr-2 w-2 h-2 rounded-full"></div>
                        <p className="text-sm text-[var(--gray-400)] ">Completed</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="bg-[var(--warning-300)] mr-2 w-2 h-2 rounded-full"></div>
                        <p className="text-sm text-[var(--gray-400)] ">Ongoing</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="bg-[var(--gray-400)] mr-2 w-2 h-2 rounded-full"></div>
                        <p className="text-sm text-[var(--gray-400)] ">Cancelled</p>
                    </div>
                </div>
                <OrderChart />
                <div className="flex w-full items-start justify-evenly mb-8 ">
                    <div className=" flex flex-col items-center ">
                        <p className="text-lg font-semibold text-[var(--gray-900)] ">0</p>
                        <p className="text-xs text-[var(--gray-600)] ">Completed</p>
                    </div>
                    <hr className="border border-[#D1D5DB] w-8 rotate-90"/>
                    <div className=" flex flex-col items-center ">
                        <p className="text-lg font-semibold text-[var(--gray-900)] ">0</p>
                        <p className="text-xs text-[var(--gray-600)] ">Ongoing</p>
                    </div>
                    <hr className="border border-[#D1D5DB] w-8 rotate-90"/>
                    <div className=" flex flex-col items-center ">
                        <p className="text-lg font-semibold text-[var(--gray-900)] ">0</p>
                        <p className="text-xs text-[var(--gray-600)] ">Cancelled</p>
                    </div>
                </div>
            </div>
        </div>
    )
}