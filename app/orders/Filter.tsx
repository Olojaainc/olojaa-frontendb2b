import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import calendar from "@/public/Calendar.svg";
import { Button } from "@/components/ui/button";
import { IoFilter } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react"
import { format } from "date-fns";
import { OrderStatus } from "../Types/Enums/OrderStatusEnum";

interface FilterProps {
  onApplyFilters?: (filters: {
    deliveryStartDate?: string;
    deliveryEndDate?: string;
    orderStatus?: string;
  }) => void;
}

export default function Filter({ onApplyFilters }: FilterProps) {
    const [deliveryStartDate, setDeliveryStartDate] = useState<Date>()
    const [deliveryEndDate, setDeliveryEndDate] = useState<Date>()
    const [orderStatus, setOrderStatus] = useState<string>("")
    const [open, setOpen] = useState(false)


    const handleApplyFilters = () => {
        const filters = {
            deliveryStartDate: deliveryStartDate ? format(deliveryStartDate, "yyyy-MM-dd") : undefined,
            deliveryEndDate: deliveryEndDate ? format(deliveryEndDate, "yyyy-MM-dd") : undefined,
            orderStatus: orderStatus || undefined,
        };
        if (onApplyFilters && typeof onApplyFilters === 'function') {
            onApplyFilters(filters);
        }
        setOpen(false);
    }

    const handleReset = () => {
        setDeliveryStartDate(undefined);
        setDeliveryEndDate(undefined);
        setOrderStatus("");
        if (onApplyFilters && typeof onApplyFilters === 'function') {
            onApplyFilters({});
        }
        setOpen(false);
    }
    return(
        <Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="rounded-xl py-2 px-[14px] w-[90px] h-9 text-sm font-semibold">
					<IoFilter className=" w-5 h-5 mt-1" />
					Filter
				</Button>
			</DialogTrigger>
			<DialogContent className="p-4 min-w-[530px] h-[400px] sm:rounded-2xl">
				<DialogHeader>
					<DialogTitle className="text-[13px]">All Filters</DialogTitle>
					<hr className="border-[var(--gray-200)]" />
				</DialogHeader>
				<div className="flex flex-col">
					<p className="text-[13px] font-semibold mb-4">Order Status</p>
					<Select value={orderStatus} onValueChange={setOrderStatus}>
						<SelectTrigger className="w-full rounded-[8px]">
							<SelectValue placeholder="Select order status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={OrderStatus.pending}>Pending</SelectItem>
							<SelectItem value={OrderStatus.completed}>Completed</SelectItem>
							<SelectItem value={OrderStatus.cancelled}>Cancelled</SelectItem>
							<SelectItem value={OrderStatus.recurring}>Recurring</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<hr className="border-[#E5E5E5]" />
				<div className="flex flex-col">
					<p className="text-[13px] font-semibold mb-4">Delivery Date Range</p>
					<div className="flex items-center space-x-2">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[232px] justify-start text-left rounded-[8px] font-normal",
										!deliveryStartDate && "text-muted-foreground"
									)}
									>
									<Image src={calendar} alt={""} />
									{deliveryStartDate ? format(deliveryStartDate, "PPP") : <span>Start Date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={deliveryStartDate}
									onSelect={setDeliveryStartDate}
								/>
							</PopoverContent>
						</Popover>
						<hr className="border w-3" />
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[232px] justify-start text-left rounded-[8px] font-normal",
										!deliveryEndDate && "text-muted-foreground"
									)}
								>
									<Image src={calendar} alt={""} />
									{deliveryEndDate ? format(deliveryEndDate, "PPP") : <span>End Date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={deliveryEndDate}
									onSelect={setDeliveryEndDate}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<hr className="border-[var(--gray-200)]" />
				<DialogFooter className="sm:justify-end">
					<Button type="button" onClick={handleReset} className="w-[72px] h-[36px] text-sm border shadow-none rounded-xl bg-transparent hover:bg-[var(--gray-75)] text-[var(--gray-600)]">
						Reset
					</Button>
					<Button type="button" onClick={handleApplyFilters} className="w-[88px] h-[36px] text-sm rounded-xl bg-[var(--primary-400)] hover:bg-[var(--primary-500)] text-white">
						Apply
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
    )
}