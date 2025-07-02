'use client';
import Image from "next/image";
import logo from '@/public/logo.svg';
import Avatar from '@/public/Avatar.svg';
import Bell from '@/public/Bell.svg';
import House from '@/public/House.svg';
import ListBullets from '@/public/ListBullets.svg';
import Truck from '@/public/Truck.svg'
import CurrencyNgn from '@/public/CurrencyNgn.svg';
import GearSix from '@/public/GearSix.svg';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/Auth/actions";
import NotificationPopup from "../components/NotificationPopup";
import { LogOut } from "lucide-react";

interface IDashboardLayout{
    children: React.ReactNode;
}

export default function DashboardLayout({children}:IDashboardLayout) {
   const pathname = usePathname();
 
    const Menu = [
        { id: 0, title: 'Dashboard', icon: House, path: '/dashboard' },
        { id: 1, title: 'Orders', icon: ListBullets, path: '/orders' },
        { id: 2, title: 'Deliveries', icon: Truck, path: '/deliveries' },
        { id: 3, title: 'Transactions', icon: CurrencyNgn, path: '/transactions' },
    ];

    return(

        <div className="flex w-full justify-center min-h-screen bg-[#F5F5F5] pt-5 overflow-hidden ">
            <aside className="flex flex-col w-[216px]  p-4 ">
                <div className="flex items-center justify-between mb-6">
                    <Image src={logo} width={75} height={24} alt="logo" />
                    <div className="flex gap-3 items-center">
                        <NotificationPopup>
                            <div className="w-7 h-7 mr-2 bg-[#E5E7EB] p-1 text-center rounded-lg hover:bg-[#D1D5DB] transition-colors">
                                <Image src={Bell} width={30} height={32} alt="Notifications" />
                            </div>
                        </NotificationPopup>
                        <Image src={Avatar} width={32} height={32} alt="logo" />
                    </div>
                   
                </div>
                <nav className="flex flex-col gap-2 mb-auto">
                    {
                        Menu.map((menuItems) => {
                            const isActive = pathname.startsWith(menuItems.path);
                            return(
                                <Link
                                    href={menuItems.path}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all
                                        ${isActive ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:bg-white hover:shadow-sm'}
                                    `}
                                    key={menuItems.title}
                                >
                                    <Image  src={menuItems.icon} alt={menuItems.title} className="mr-2 w-auto h-auto" width={16} height={16}  />
                                    {menuItems.title}
                                </Link>
                            )
                        })
                    }
                </nav>

                <div className="pt-6 border-t border-[#D1D5DB]">
                    <div className="flex mb-4">
                        <LogOut width={16} height={16} className="mr-2 w-auto h-auto text-[#6B7280]" />
                        <button onClick={logout} className="text-sm font-medium text-[var(--primary-400)]">Logout</button>
                    </div>
                    <button className="flex">
                        <Image className="mr-2 w-auto h-auto " src={GearSix} width={16} height={16} alt="Gear Icon" />
                        <p className="text-sm text-[var(--gray-400)]">Settings</p>
                    </button>
                </div>
            </aside>
            <main className=" w-full pt-6 px-6 h-[100vh] overflow-auto">
                {children}
            </main>
        </div>
    )
}