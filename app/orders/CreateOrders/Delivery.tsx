import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarDays, Plus } from "lucide-react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { orderDetails } from "../Data"

interface IDeliveryProps{
    isCreateOrder:boolean;
    onCloseOrder: () => void;
}


export default function Delivery({isCreateOrder, onCloseOrder}: IDeliveryProps) {
	const [isRecurring, setRecurring] = useState(false);
	const [date, setDate] = useState<Date>()

	const handleRecurringDelivery = () => {
		setRecurring(!isRecurring);
	}
    return(
        <Dialog
            open={isCreateOrder}
            onOpenChange={onCloseOrder}
        >
			<DialogContent className="max-w-[600px] max-h-[700px] h-auto p-0 overflow-scroll hide-scrollbar ">
                <DialogHeader className="px-6 pt-6">
                    <DialogTitle>Make an order</DialogTitle>
                    <DialogDescription  className="pt-6 ">
                       <div className="flex justify-between items-center">
                            <div className="flex w-28 justify-between items-center">
                                <span className="w-6 h-6 bg-transparent
                                    border
                                    border-[var(--gray-600)]
                                    text-[var(--gray-600)]
                                    rounded-3xl 
                                    px-2 flex items-center justify-center "
                                >
                                    1
                                </span>
                                <span className="text-[var(--gray-900)] text-xs font-medium">Order Details</span>
                            </div>
                            <hr className="w-7" style={{ border: '1px thin #D1D5DB' }}/>
                            <div className="flex w-[149px] justify-between items-center">
                                <span className="w-6 h-6 bg-[var(--primary-400)]
                                   
                                    text-white
                                    rounded-3xl 
                                    px-2 flex items-center justify-center"
                                >
                                    2
                                </span>
                                <span className="text-[var(--gray-900)] text-xs font-medium">Delivery & Schedule</span>
                            </div>
                            <hr className="w-7" style={{ border: '1px thin #D1D5DB' }}/>
                            <div className="flex w-[155px] justify-between items-center">
                                <span className="w-6 h-6 bg-transparent 
                                    border
                                    border-[var(--gray-600)]
                                    text-[var(--gray-600)]
                                    rounded-3xl 
                                    px-2 flex items-center justify-center
                                     "
                                >
                                    3
                                </span>
                                <span className="text-[var(--gray-900)] text-xs font-medium">Payment & Summary</span>
                            </div>
                       </div>
                       <hr className="mt-4" />
                    </DialogDescription>

                </DialogHeader>

                <div className="flex flex-col gap-6 px-6">
                    <div className="flex flex-col gap-1"> 
                        <p className="text-2xl font-bold">Delivery Information</p>
                        <p className="text-xs font-medium text-[var(--gray-600)] ">Kindly enter your delivery information</p>
                    </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Enter your delivery address</p>
                        <input placeholder="No 3, Agidi street,Bodija Ibadan" 
                        	className="border w-full h-11 border-[var(--gray-200)] bg-[var(--gray-100)] placeholder:text-[var(--gray-900)] text-[var(--gray-900)]  rounded-xl placeholder:text-xs placeholder:pl-4 "
                        />
                        
						<Dialog >
							<DialogTrigger asChild>
								<p className=" self-end text-sm font-medium text-[var(--primary-400)] cursor-pointer ">Change</p>
							</DialogTrigger>
							<DialogContent className="max-w-[448px] h-[481px] flex flex-col ">
								<DialogHeader>
									<DialogTitle>Choose a Delivery Address</DialogTitle>
									<DialogDescription>
										Kindly select your preferred delivery address
									</DialogDescription>
								</DialogHeader>
								<div className=" flex flex-col gap-8 ">
									<RadioGroup className=" gap-4" defaultValue="Never">
										<div className="flex items-start space-x-2">
											<RadioGroupItem
												value={orderDetails.data.address}
												id="r1"
											/>
											<Label className="text-[13px] font-normal text-[var(--gray-600)] w-[93px]" htmlFor="r1">{orderDetails.data.address}</Label>
										</div>
									</RadioGroup>
									<hr className="border-[var(--gray-200)]" />
								</div>
								<div className="flex flex-col gap-8 ">
									<RadioGroup className=" gap-4" defaultValue="Never">
										<div className="flex items-start space-x-2">
											<RadioGroupItem
												value={orderDetails.data.address}
												id="r1"
											/>
											<Label className="text-[13px] font-normal text-[var(--gray-600)] w-[93px]" htmlFor="r1">{orderDetails.data.address}</Label>
										</div>
									</RadioGroup>
									<hr className="border-[var(--gray-200)]" />
								</div>
								<Dialog>
									<DialogTrigger asChild>
										<span className=" flex items-center justify-start text-sm font-medium text-[var(--primary-400)] cursor-pointer "><Plus/>Add a new address</span>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[448px] h-[300px] space-y-1 p-4">
										<DialogHeader>
											<DialogTitle className="text-2xl font-bold text-[var(--Gray-600)]">Add a New Address</DialogTitle>
											<DialogDescription className="text-xs font-medium">
												Kindly type in and select your address
											</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="flex flex-col items-start gap-2">
												<Label htmlFor="name" className="text-right text-xs font-medium text-[var(--Gray-900)]">
													Enter your delivery address
												</Label>
												<Input
													id="name"
													placeholder="No 3, Agidi street, Bodija Ibadan"
													className="rounded-xl"
												/>
											</div>
										</div>
										<hr className="border-[var(--gray-200)]" />
										<DialogFooter >
											<Button  className="rounded-xl " variant={'outline'} type="submit">Back</Button>
											<Button className="rounded-xl bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)] ml-2" type="submit">Done</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
								
								<DialogFooter>
									<Button className="rounded-xl w-20 h-9" variant={'outline'} type="button">Cancel</Button>
									<Button className="rounded-xl w-20 h-9 bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)] ml-2" type="submit">Proceed</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
                   </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Select your delivery date</p>
                        <Select>
                            <SelectTrigger className="w-full h-11 rounded-xl">
                                <SelectValue placeholder="Select Date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                   </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Delivery Type</p>
                        <Select>
                            <SelectTrigger className="w-full h-11 rounded-xl">
                                <SelectValue placeholder="Select your type of delivery" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                   </div>
				<div className="flex items-start space-x-2">
					<Switch onCheckedChange={handleRecurringDelivery} id="airplane-mode" className=" data-[state=checked]:bg-[var(--primary-400)]" />
					<div className="flex flex-col items-start space-y-2">
						<Label htmlFor="airplane-mode">Set as Recurring</Label>
						<p className="text-[13px] text-[var(--gray-600)]">Toggle this on or off to set this order as a recurring order</p>
					</div>
				</div>
					{isRecurring && <div className="flex flex-col gap-6">
						<div className="flex items-center justify-between space-x-2 w-full">
							<div className="flex flex-col w-full gap-2">
								<p className="text-sm font-medium text-[var(--gray-900)] ">Repeat Delivery Every</p>
								<input placeholder="1" className="border w-full h-11 shadow-sm rounded-xl placeholder:text-[var(--gray-900)] text-[var(--gray-900)] placeholder:text-xs placeholder:pl-4 "/>
							</div>
							<Select>
								<SelectTrigger className="w-full self-end h-11 rounded-xl shadow-sm text-[var(--gray-600)]">
									<SelectValue className="placeholder:text-[var(--gray-600)]" placeholder="day(s)" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="day(s)">day(s)</SelectItem>
										<SelectItem value="weeks">week(s)</SelectItem>
										<SelectItem value="month(s)">month(s)</SelectItem>
										<SelectItem value="year">year(s)</SelectItem>
										
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-sm font-medium text-[var(--gray-900)] ">Start</p>
							<Select>
								<SelectTrigger className="w-full h-11 rounded-xl shadow-sm">
									<SelectValue className="placeholder:text-[var(--gray-900)] " placeholder="Select Start Date" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="day(s)">day(s)</SelectItem>
										<SelectItem value="weeks">week(s)</SelectItem>
										<SelectItem value="month(s)">month(s)</SelectItem>
										<SelectItem value="year">year(s)</SelectItem>
										
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<RadioGroup className=" gap-4" defaultValue="Never">
							<p className="text-sm font-medium text-[var(--gray-900)] ">End</p>	
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="Never"
									id="r1"
								/>
								<Label className="text-[13px] font-normal text-[var(--gray-600)]" htmlFor="r1">Never</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="On" id="r2" />
								<Label className="flex items-center w-[100px] justify-between text-[13px] font-normal text-[var(--gray-600)]" htmlFor="r2">On 
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-auto h-10 rounded-xl ml-4 p-6 shadow-md justify-start text-left font-normal",
													!date && "text-muted-foreground"
												)}
											>
												<CalendarDays color="black" className="text-black" />
												{date ? format(date, "PPP") : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={date}
												onSelect={setDate}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="after" id="r3" />
								<Label className="flex items-center justify-between  text-[13px] font-normal text-[var(--gray-600)]" htmlFor="r3">After
									<Input className="w-14 ml-4 shadow-md" type="number" placeholder="1" />
								</Label>
								<Label  className="flex items-center w-[100px] justify-between text-[13px] font-normal text-[var(--gray-600)]" htmlFor="r3">Occurences</Label>
							</div>
						</RadioGroup>
					</div>}
                </div>
               
				<DialogFooter className="sm:justify-end mt-4 border-t  bg-white p-4 sticky bottom-0 left-0 right-0">
					<DialogClose asChild>
						<Button className="rounded-xl w-20 h-9" onClick={onCloseOrder} type="button" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button className="rounded-xl w-20 h-9 bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)] ml-2" onClick={onCloseOrder} type="button" variant="outline">
						Proceed
					</Button>
				</DialogFooter>
            </DialogContent>
        </Dialog>
    )
}