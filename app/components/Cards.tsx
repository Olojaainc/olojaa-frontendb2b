import { Flex } from "antd";
import Image from "next/image";
import { ICardContent } from "../Types/Interfaces/ICard";

interface ICardsProps{
    content: ICardContent;
    backgroundGradient: string;
}

export default function Cards({content, backgroundGradient}:ICardsProps) {
    return(
        <Flex className="flex justify-between">
            <Flex gap={'8px'} className={`flex items-start border-[0.3px] w-[270px] h-[80px] ${backgroundGradient} rounded-3xl py-4 px-3 shadow`}>
                <Image src={content.icon} width={16} height={16}  alt="file icon" />
                <Flex gap={'2px'} className="flex flex-col  justify-between items-start">
                    <p className="text-xs mb-2 text-[var(--gray-600)]">{content.cardTitle}</p>
                    <p className="text-lg mb-2 font-semibold text-[var(--gray-900)]">{content.Value}</p>
                </Flex>
            </Flex>
        </Flex>
    )
}