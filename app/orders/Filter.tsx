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
import calendar from "@/public/Calendar.svg";
import { Button } from "@/components/ui/button";
import { IoFilter } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react"
import { format } from "date-fns";

export default function Filter() {
    const [date, setDate] = useState<Date>()
    return(
        <Dialog  >
			<DialogTrigger asChild>
				<Button variant="outline" className="rounded-xl py-2 px-[14px] w-[90px] h-9 text-sm font-semibold">
					<IoFilter className=" w-5 h-5 mt-1" />
					Filter
				</Button>
			</DialogTrigger>
			<DialogContent className="p-4 min-w-[530px] h-[367px] sm:rounded-2xl">
				<DialogHeader>
					<DialogTitle className="text-[13px]">All Filters</DialogTitle>
					<hr className="border-[var(--gray-200)]" />
				</DialogHeader>
				<div className="flex flex-col">
					<p className="text-[13px] font-semibold mb-4">Order Date</p>
					<div className="flex items-center space-x-2">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[232px] justify-start text-left font-normal rounded-[8px]",
										!date && "text-muted-foreground"
									)}
									>
									<Image src={calendar} alt={""} />
									{date ? format(date, "PPP") : <span>December 7th, 2025</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
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
										!date && "text-muted-foreground"
									)}
								>
									<Image src={calendar} alt={""} />
									{date ? format(date, "PPP") : <span>December 7th, 2025</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<hr className="border-[#E5E5E5]" />
				<div className="flex flex-col">
					<p className="text-[13px] font-semibold mb-4">Delivery Date</p>
					<div className="flex items-center space-x-2">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[232px] justify-start text-left rounded-[8px] font-normal",
										!date && "text-muted-foreground"
									)}
									>
									<Image src={calendar} alt={""} />
									{date ? format(date, "PPP") : <span>December 7th, 2025</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
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
										!date && "text-muted-foreground"
									)}
									>
									<Image src={calendar} alt={""} />
									{date ? format(date, "PPP") : <span>December 7th, 2025</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
				<hr className="border-[var(--gray-200)]" />
				<DialogFooter className="sm:justify-end">
					<DialogClose asChild >
						<Button type="button" className="w-[72px] h-[36px] text-sm border shadow-none rounded-xl bg-transparent hover:bg-[var(--gray-75)] text-[var(--gray-600)]">
							Cancel
						</Button>
					</DialogClose>
					<Button type="button" className="w-[88px] h-[36px] text-sm rounded-xl bg-[var(--primary-400)] hover:bg-[var(--primary-500)] text-white">
						Apply
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
    )
}