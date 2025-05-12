'use client';
import Image from "next/image";
import logo from '@/public/logo.svg';
import Avatar from '@/public/Avatar.svg';
import Bell from '@/public/Bell.svg';
import House from '@/public/House.svg';
import ListBullets from '@/public/ListBullets.svg';
import Truck from '@/public/Truck.svg';
import CurrencyNgn from '@/public/CurrencyNgn.svg';
import Headset from '@/public/Headset.svg';
import GearSix from '@/public/GearSix.svg';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IDashboardLayout {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayout) {
  const pathname = usePathname();

  const Menu = [
    { id: 0, title: 'Dashboard', icon: House, path: '/dashboard' },
    { id: 1, title: 'Orders', icon: ListBullets, path: '/orders' },
    { id: 2, title: 'Deliveries', icon: Truck, path: '/deliveries' },
    { id: 3, title: 'Transactions', icon: CurrencyNgn, path: '/transactions' },
  ];

  return (
    <div className="flex w-full min-h-screen bg-[#F5F5F5] p-5 overflow-hidden">
      <aside className="flex flex-col w-[216px] pr-6">
        <div className="flex items-center justify-between mb-6">
          <Image src={logo} width={75} height={24} alt="Logo" />
          <div className="flex items-center gap-2">
            <div className="w-9 h-8 bg-[#E5E7EB] p-1 rounded-lg flex items-center justify-center">
              <Image src={Bell} width={20} height={20} alt="Notifications" />
            </div>
            <Image src={Avatar} width={32} height={32} alt="User Avatar" />
          </div>
        </div>

        <nav className="flex flex-col gap-2 mb-auto">
          {Menu.map((item) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${isActive ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:bg-white hover:shadow-sm'}
                `}
              >
                <Image src={item.icon} alt={item.title} width={16} height={16} className="mr-3" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-[#D1D5DB]">
          <button className="flex items-center px-3 py-2 text-sm text-gray-500 hover:text-black transition">
            <Image src={Headset} alt="Help" width={16} height={16} className="mr-3" />
            Help
          </button>
          <button className="flex items-center px-3 py-2 text-sm text-gray-500 hover:text-black transition">
            <Image src={GearSix} alt="Settings" width={16} height={16} className="mr-3" />
            Settings
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-white rounded-lg p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}