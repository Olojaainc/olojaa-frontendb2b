import DashboardLayout from "../Layouts/DashboardLayout";
import CreditLine from "./Components/CreditLine";
import OrderManagement from "./Components/OrderManagement";
export default function Home() {
    return(
        <DashboardLayout>
           <div className="flex justify-between p-2 mb-6">
                <div>
                    <h3 className="font-semibold text-lg text-[var(--gray-900)]">Good Morning,</h3>
                    <p className="font-medium text-sm text-[var(--gray-400)] ">Monday, January 6, 2025</p>
                </div>
                <div>
                    <p>calender</p> 
                </div>
           </div>
           <div className="flex justify-between mb-4">
                <div className="flex flex-col items-start justify-between w-[380px] h-[160px] bg-white rounded-3xl py-4 px-3 shadow-sm">
                    <p className="text-xs mb-2 text-[var(--gray-600)]">Credit line remaining</p>
                    <p className="text-lg mb-2 font-semibold text-[var(--gray-900)]">500KG</p>
                    <div className="flex mb-2 items-center">
                        
                        <p  className="custom-border bg-[#E9F7ED] text-[var(--success-400)] font-medium rounded-xl py-[2px] px-[8px] text-sm mr-1">+30%</p>
                        
                        <p className="text-xs">vs yesterday</p>
                    </div>
                    <button className="border border-[#D1D5DB] text-sm font-semibold rounded-xl px-[14px] py-2">see full details</button>
                </div>
                <div className="flex flex-col items-start justify-between w-[380px] h-[160px]  bg-white rounded-3xl py-4 px-3 shadow-sm">
                    <p className="text-xs mb-2 text-[var(--gray-600)]">Credit line remaining</p>
                    <p className="text-lg mb-2 font-semibold text-[var(--gray-900)]">500KG</p>
                    <div className="flex mb-2 items-center">
                        
                        <p  className="custom-border bg-[#E9F7ED] text-[var(--success-400)] font-medium rounded-xl py-[2px] px-[8px] text-sm mr-1">+30%</p>
                        
                        <p className="text-xs">vs yesterday</p>
                    </div>
                    <button className="border border-[#D1D5DB] text-sm font-semibold rounded-xl px-[14px] py-2">see full details</button>
                </div>
                <div className="flex flex-col items-start justify-between w-[380px] h-[160px] bg-white rounded-3xl py-4 px-3 shadow-sm">
                    <p className="text-xs mb-2 text-[var(--gray-600)]">Credit line remaining</p>
                    <p className="text-lg mb-2 font-semibold text-[var(--gray-900)]">500KG</p>
                    <div className="flex mb-2 items-center">
                        
                        <p  className="custom-border bg-[#E9F7ED] text-[var(--success-400)] font-medium rounded-xl py-[2px] px-[8px] text-sm mr-1">+30%</p>
                        
                        <p className="text-xs">vs yesterday</p>
                    </div>
                    <button className="border border-[#D1D5DB] text-sm font-semibold rounded-xl px-[14px] py-2">see full details</button>
                </div>
           </div>
           <div className="bg-custom-radial flex items-center justify-between border-[0.5px] shadow-sm rounded-2xl px-3 py-4">
                <div>
                    <p className="text-xs mb-2 text-[var(--gray-600)]">Total Orders</p>
                    <p className="text-lg mb-2 font-semibold text-[var(--gray-900)]">50</p>
                    <div className="flex mb-2 items-center">
                        
                        <p  className="custom-border bg-[#FBEAE9] text-[var(--error-400)] font-medium rounded-xl py-[2px] px-[8px] text-sm mr-1">-3%</p>
                        
                        <p className="text-xs">vs yesterday</p>
                    </div>
                </div>
                <button className="bg-[var(--primary-400)] text-white w-[122px] h-[36px] rounded-xl p-1 text-sm">Make an Order</button>
           </div>
           <div className="flex justify-between">
                <CreditLine />
                <OrderManagement />
           </div>
        </DashboardLayout>
        
    )
}