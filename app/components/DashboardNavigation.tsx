import Image from "next/image";
import File from '@/public/File.svg'

interface DashboardNavigationProps {
    handleCreateOrder?: () => void;
    title: string;
    isVisible: boolean;
}
export default function DashboardNavigation({handleCreateOrder, title, isVisible}: DashboardNavigationProps) {
    return(
        <div className="flex justify-between w-full">
            <p className="font-semibold text-xl"> {title}</p>
            {isVisible && <div className="flex justify-between w-[250px]">
                <button className="flex items-center justify-center bg-transparent 
                    text-[var(--gray-600] font-semibold w-[122px] 
                    h-[36px] border border-[var(--gray-200)]
                    rounded-xl p-1 text-sm"
                >
                    <Image src={File} width={20} height={20}  alt="file icon" />
                    Export CSV
                </button>
                <button className="bg-[var(--primary-400)] 
                    font-semibold text-white w-[122px] 
                    h-[36px] rounded-xl p-1 text-sm"
                    onClick={handleCreateOrder}
                >
                    Make an Order
                </button>
            </div>}
        </div>
    )
}