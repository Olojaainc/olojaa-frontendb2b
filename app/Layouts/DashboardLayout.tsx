import Image from "next/image";
import logo from '@/public/logo.svg';
import Avatar from '@/public/Avatar.svg';
import Bell from '@/public/Bell.svg';
import House from '@/public/House.svg';
import ListBullets from '@/public/ListBullets.svg';
import Truck from '@/public/Truck.svg'
import CurrencyNgn from '@/public/CurrencyNgn.svg';
import CreditCard from '@/public/CreditCard.svg';
import Headset from '@/public/Headset.svg';
import GearSix from '@/public/GearSix.svg';

interface IDashboardLayout{
    children: React.ReactNode;
}

export default function DashboardLayout({children}:IDashboardLayout) {

    const Menu = [
        {
            title: 'Dashboard',
            icon: House
        },
        {
            title: 'Orders',
            icon: ListBullets
        },
        {
            title: 'Deliveries',
            icon: Truck
        },
        {
            title: 'Transactions',
            icon:CurrencyNgn
        },
        {
            title: 'Credit Line',
            icon: CreditCard
        },
    ]
    return(
        <div className="flex w-[100vw] justify-evenly h-[100vh] bg-[#F5F5F5] pt-5 pb-[25px] overflow-scroll ">
            <div className="flex flex-col w-[216px] h-[754px] px-2 ">
                <div className="flex items-center justify-between">
                    <Image src={logo} width={75} height={24} alt="logo" />
                    <div className="flex items-center">
                        <div className="w-9 h-8 mr-2 bg-[#E5E7EB] p-1 text-center rounded-lg">
                            <Image src={Bell} width={36} height={32} alt="logo" />
                        </div>
                        <Image src={Avatar} width={32} height={32} alt="logo" />
                    </div>
                   
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className="mt-[24px]">
                        {
                            Menu.map((menuItems, index) => {
                                return(
                                    <div 
                                        className={`flex mb-4 cursor-pointer ${index === 0 ? 'bg-white rounded-lg p-2 shadow-sm' : 'pl-2'}`} 
                                        key={menuItems.title}
                                    >
                                        <Image className="mr-2" src={menuItems.icon} width={16} height={16} alt="" />
                                        <p className="text-sm text-[var(--gray-400)]">{menuItems.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    <div>
                        <hr className="border border-solid border-[#D1D5DB] mb-4"/>
                        <div className="flex mb-4">
                            <Image className="mr-2" src={Headset} width={16} height={16} alt="" />
                            <p className="text-sm text-[var(--gray-400)]">Help</p>
                        </div>
                        <div className="flex">
                            <Image className="mr-2" src={GearSix} width={16} height={16} alt="" />
                            <p className="text-sm text-[var(--gray-400)]">Settings</p>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className=" w-[1164px] h-[754px]">
                {children}
            </div>
        </div>
    )
}