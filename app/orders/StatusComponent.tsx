import { Flex } from "antd";
import { OrderStatus } from "../Types/Enums/OrderStatusEnum";
import { GoDotFill } from "react-icons/go";

export const StatusComponent = (status:string ) => {
	switch (status) {
	  case OrderStatus.pending:
		return <Flex gap={'5px'} justify="flex-start" align="center" className="rounded-2xl w-[95px] h-5 bg-[var(--warning-75)] py-[2px] px-3 ">
			<GoDotFill className="text-[var(--warning-400)] w-[8px] h-[8px]" />
			<p className="text-[var(--warning-400)] text-xs capitalize">{status}</p>
		</Flex>;
	  case OrderStatus.completed:
		return <Flex gap={'5px'}  justify="flex-start" align="center" className="rounded-2xl w-[100px] h-5 bg-[var(--success-75)] py-[2px] px-3 ">
			<GoDotFill className="text-[var(--success-400)] w-[8px] h-[8px]" />
			<p className="text-[var(--success-400)] text-xs capitalize">{status}</p>
		</Flex>;
	  case OrderStatus.cancelled:
		return <Flex gap={'5px'}  justify="flex-start" align="center" className="rounded-2xl w-[95px] h-5 bg-[var(--error-75)] py-[2px] px-3 ">
			<GoDotFill className="text-[var(--error-400)] w-[8px] h-[8px]" />
			<p className="text-[var(--error-400)] text-xs capitalize">{status}</p>
		</Flex>;
		case OrderStatus.recurring:
		return<Flex gap={'5px'}  justify="flex-start" align="center" className="rounded-2xl w-[95px] h-5 bg-[var(--lime-75)] py-[2px] px-3 ">
			<GoDotFill className="text-[var(--lime-600)] w-[8px] h-[8px]" />
			<p className="text-[var(--lime-600)] text-xs capitalize">{status}</p>
		</Flex>;
	  default:
		return <p>Unknown status.</p>;
	}
};