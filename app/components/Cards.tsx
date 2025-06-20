/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "antd";
import Image from "next/image";
import { ICardContent } from "../Types/Interfaces/ICard";
import { Skeleton } from "@/components/ui/skeleton";

interface ICardsProps{
    content: ICardContent;
    data: any
    backgroundGradient: string;
    showCards?: boolean;
    isLoading: boolean;
}

export default function Cards({content, isLoading, data, backgroundGradient, showCards = true}:ICardsProps) {
    return(
        <Flex className="flex justify-between">
            <Flex gap={'8px'} className={`flex items-start border-[0.3px] w-[270px] h-[80px] ${backgroundGradient} rounded-2xl py-4 px-3 shadow`}>
                {showCards && <Image src={content.icon} width={16} height={16}  alt="file icon" />}
                <Flex gap={'2px'} className="flex flex-col  justify-between items-start">
                    <p className="text-xs mb-2 text-[var(--gray-600)]">{content.cardTitle}</p>
                    {isLoading ? <Skeleton className="h-4 w-12" /> : <p className="text-lg mb-2 font-semibold text-[var(--gray-900)]">{data}</p>}
                </Flex>
            </Flex>
        </Flex>
    )
}