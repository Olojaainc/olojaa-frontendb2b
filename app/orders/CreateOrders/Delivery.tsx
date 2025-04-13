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
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { orderDetails } from "../Data"
import { useFormik } from 'formik';
import { IOrderDetails } from "@/app/Types/Interfaces/IOrders"
import { formatDateShort } from "@/app/Utils/dateFormat"

interface IDeliveryProps{
    formik: ReturnType<typeof useFormik<IOrderDetails>>;
    onNext: () => void;
    onClose: () => void;
	onPrev: () => void;
}


export default function Delivery({ onPrev, onNext, formik}: IDeliveryProps) {
	const [isRecurring, setRecurring] = useState(false);
	const [recurringValue, setRecurringValue] = useState(0);
	const [endDate, setEndDate] = useState<Date>()
	const [deliveryDate, setDeliveryDate] = useState<Date>();
	const [startDate, setStartDate] = useState<Date>();
	const [endMode, setEndMode] = useState<'Never' | 'On' | 'After'>('Never');
	const [addresses, setAddresses] = useState<string[]>([
		orderDetails.data.address,
		// add more if needed
	]);
	const [newAddress, setNewAddress] = useState('');
	const {handleChange, values, setFieldValue} = formik

	const handleRecurringDelivery = () => {
		setRecurring(!isRecurring);
	}

	useEffect(() => {
		setRecurringValue(isRecurring ? 0 : 1);
		setFieldValue('recurring', recurringValue);
	},[isRecurring]);

    return(
		<div className="p-6">
                <DialogHeader>
                    <DialogTitle>Make an order</DialogTitle>
                    <div  className="pt-6 ">
                       <div className="flex justify-between items-center">
                            <div className="flex w-28 justify-between items-center">
                                <span className="w-6 h-6 bg-transparent
                                    border
                                    border-[var(--gray-600)]
                                    text-[var(--gray-600)]
                                    rounded-3xl 
                                    px-2 flex items-center justify-center cursor-pointer "
									onClick={onPrev}
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
                                    px-2 flex items-center justify-center"
									onClick={onNext}
                                >
                                    3
                                </span>
                                <span className="text-[var(--gray-900)] text-xs font-medium">Payment & Summary</span>
                            </div>
                       </div>
                       <hr className="mt-4" />
                    </div>

                </DialogHeader>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1 "> 
                        <p className="text-2xl font-bold mt-4">Delivery Information</p>
                        <p className="text-xs font-medium text-[var(--gray-600)] ">Kindly enter your delivery information</p>
                    </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Enter your delivery address</p>
                        <Input 
							name="delivery_address" 
							type="text" 
							readOnly 
							value={values.delivery_address} 
							placeholder={"Choose a delivery address" }
                        	className="border w-full h-11 border-[var(--gray-200)] bg-[var(--gray-100)] placeholder:text-[var(--gray-900)] text-[var(--gray-900)]  rounded-xl placeholder:text-xs "
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
									<RadioGroup
										value={values.delivery_address}
										onValueChange={(value) => setFieldValue('delivery_address', value)}
										className="gap-4"
									>
										{addresses.map((addr, idx) => (
											<div className="flex flex-col space-y-4" key={idx}>
												<div key={idx} className="flex items-start space-x-2">
													<RadioGroupItem value={addr} id={`addr-${idx}`} />
													<Label className="text-[13px] font-normal text-[var(--gray-600)] w-[93px]" htmlFor={`addr-${idx}`}>{addr}</Label>
												</div>
												<hr className="border-[var(--gray-200)]" />
											</div>
										))}
									</RadioGroup>
									
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
													value={newAddress}
  													onChange={(e) => setNewAddress(e.target.value)}
													name="delivery_address"
												/>
											</div>
										</div>
										<hr className="border-[var(--gray-200)]" />
										<DialogFooter >
											{/* <Button  className="rounded-xl " variant={'outline'} type="submit">Back</Button> */}
											<DialogClose asChild>
												<Button 
													className="rounded-xl bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)] ml-2" 
													type="button"
													onClick={() => {
														if (newAddress.trim()) {
														setAddresses([...addresses, newAddress]);
														setFieldValue('delivery_address', newAddress);
														setNewAddress('');
														}
													}}
												>
													Done
												</Button>
											</DialogClose>
										</DialogFooter>
									</DialogContent>
								</Dialog>
								
								<DialogFooter>
									<DialogClose asChild><Button className="rounded-xl w-20 h-9" variant={'outline'} type="button">Cancel</Button></DialogClose>
									
									<DialogClose asChild>
										<Button 
											className="rounded-xl w-20 h-9 bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)] ml-2" 
											type="button">
												Proceed
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
                   </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Select your delivery date</p>
						<Popover>
							<PopoverTrigger asChild>
								<Button
								variant={"outline"}
								className={cn(
									"w-full h-11 rounded-xl justify-start text-left font-normal",
									!deliveryDate && "text-muted-foreground"
								)}
								>
								<CalendarIcon />
								{deliveryDate ? format(deliveryDate, "PPP") : <span>Select Date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={deliveryDate}
									onSelect={(deliveryDate) => {
										setDeliveryDate(deliveryDate);
										setFieldValue("delivery_date", formatDateShort(deliveryDate));
									}}
									initialFocus
								/>
							</PopoverContent>
						</Popover>

                   </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Delivery Type</p>
                        <Select value={values.delivery_type} name="delivery_type" onValueChange={(value) => handleChange({ target: { name: 'delivery_type', value } })}>
                            <SelectTrigger className="w-full h-11 rounded-xl">
                                <SelectValue placeholder="Select your type of delivery" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
									<SelectItem value="recurring">Recurring</SelectItem>
									<SelectItem value="one-time">One-time</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                   </div>
				<div className="flex items-start space-x-2">
					<Switch name="recurring" value={values.recurring} onCheckedChange={handleRecurringDelivery} id="airplane-mode" className=" data-[state=checked]:bg-[var(--primary-400)]" />
					<div className="flex flex-col items-start space-y-2">
						<Label htmlFor="airplane-mode">Set as Recurring</Label>
						<p className="text-[13px] text-[var(--gray-600)]">Toggle this on or off to set this order as a recurring order</p>
					</div>
				</div>
					{isRecurring && <div className="flex flex-col gap-6">
						<div className="flex items-center justify-between space-x-2 w-full">
							<div className="flex flex-col w-full gap-2">
								<p className="text-sm font-medium text-[var(--gray-900)] ">Repeat Delivery Every</p>
								<Input 
									name="frequency_number"
									onChange={handleChange}
									value={values.frequency_number}
									type="number"
									placeholder="1" 
									className="border w-full h-11 shadow-sm rounded-xl placeholder:text-[var(--gray-900)] text-[var(--gray-900)] placeholder:text-xs  "/>
							</div>
							<Select value={values.frequency} name="frequency" onValueChange={(value) => handleChange({ target: { name: 'frequency', value } })}>
								<SelectTrigger className="w-full self-end h-11 rounded-xl shadow-sm text-[var(--gray-600)]">
									<SelectValue className="placeholder:text-[var(--gray-600)]" placeholder="day(s)" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="day">day(s)</SelectItem>
										<SelectItem value="week">week(s)</SelectItem>
										<SelectItem value="month">month(s)</SelectItem>
										<SelectItem value="year">year(s)</SelectItem>
										
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-sm font-medium text-[var(--gray-900)] ">Start</p>
							<Popover>
								<PopoverTrigger asChild>
									<Button
									variant={"outline"}
									className={cn(
										"w-full h-11 rounded-xl justify-start text-left font-normal",
										!startDate && "text-muted-foreground"
									)}
									>
									<CalendarIcon />
									{startDate ? format(startDate, "PPP") : <span>Select a start date</span>}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={startDate}
										onSelect={(startDate) => {
											setStartDate(startDate);
											setFieldValue("start_date", formatDateShort(startDate));
										}}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>
						<RadioGroup
							value={endMode}
							onValueChange={(value) => setEndMode(value as 'Never' | 'On' | 'After')}
							className="gap-4"
							>
							<p className="text-sm font-medium text-[var(--gray-900)]">End</p>

							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Never" id="r1" />
								<Label htmlFor="r1">Never</Label>
							</div>

							<div className="flex items-center space-x-2">
								<RadioGroupItem value="On" id="r2" />
								<Label htmlFor="r2">On</Label>
								{endMode === "On" && (
								<Popover>
									<PopoverTrigger asChild>
									<Button variant="outline" className="ml-4">
										{endDate ? format(endDate, "PPP") : "Pick a date"}
									</Button>
									</PopoverTrigger>
									<PopoverContent>
									<Calendar
										mode="single"
										selected={endDate}
										onSelect={(date) => {
											setEndDate(date);
											setFieldValue("end_date", formatDateShort(date));
											setFieldValue("end_after", 0);
										}}
									/>
									</PopoverContent>
								</Popover>
								)}
							</div>

							<div className="flex items-center space-x-2">
								<RadioGroupItem value="After" id="r3" />
								<Label htmlFor="r3">After</Label>
								{endMode === "After" && (
								<>
									<Input
										name="end_after"
										onChange={(e) => {
											handleChange(e);
											setFieldValue("end_date", ""); 
										}}
										className="w-14 ml-4"
										type="number"
										placeholder="1"
									/>
									<span>occurrences</span>
								</>
								)}
							</div>
						</RadioGroup>
					</div>}
                </div>
               
				<DialogFooter className="sm:justify-end mt-4 border-t  bg-white p-4 sticky bottom-0 left-0 right-0">
					<DialogClose asChild>
						<Button className="rounded-xl w-20 h-9"  type="button" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button 
						className="rounded-xl w-20 h-9 bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)] ml-2" 
						onClick={onNext} 
						type="button" 
						variant="outline"
					>
						Proceed
					</Button>
				</DialogFooter>
       </div>
    )
}