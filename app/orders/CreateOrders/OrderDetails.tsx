import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

interface ICreateOrder{
    isCreateOrder:boolean;
    onCloseOrder: () => void;
}

export default function OrderDetails({isCreateOrder, onCloseOrder}:ICreateOrder) {
    return(
        <Dialog
            open={isCreateOrder}
            onOpenChange={onCloseOrder}
        >
            <DialogContent className="max-w-[600px] h-auto rounded-3xl ">
                <DialogHeader>
                    <DialogTitle>Make an order</DialogTitle>
                    <DialogDescription className="pt-6 ">
                       <div className="flex justify-between items-center">
                            <div className="flex w-28 justify-between items-center">
                                <span className="w-6 h-6 bg-[var(--primary-400)]
                                    text-white 
                                    rounded-3xl 
                                    px-2 flex items-center justify-center "
                                >
                                    1
                                </span>
                                <span className="text-[var(--gray-900)] text-xs font-medium">Order Details</span>
                            </div>
                            <hr className="w-7" style={{ border: '1px thin #D1D5DB' }}/>
                            <div className="flex w-[149px] justify-between items-center">
                                <span className="w-6 h-6 bg-transparent 
                                    border
                                    border-[var(--gray-600)]
                                    text-[var(--gray-600)]
                                    rounded-3xl 
                                    px-2 flex items-center justify-center
                                     "
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

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1"> 
                        <p className="text-2xl font-bold">Order Details</p>
                        <p className="text-xs font-medium text-[var(--gray-600)] ">Kindly enter the details of your order</p>
                    </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Enter how many quantity of gas you want to buy</p>
                        <input placeholder="20kg" className="border w-full h-11 rounded-xl placeholder:text-xs placeholder:pl-4 "/>
                        <p className="text-sm font-medium text-[var(--primary-400)] ">Gas sells at 1,500 per KG</p>
                   </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Select the type of gas you want</p>
                        <Select>
                            <SelectTrigger className="w-full h-11 rounded-xl">
                                <SelectValue placeholder="Gas Type" />
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
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Select your preferred gas provider</p>
                        <Select>
                            <SelectTrigger className="w-full h-11 rounded-xl">
                                <SelectValue placeholder="Gas provider" />
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
                </div>
               
                <DialogFooter className="sm:justify-end mt-4">
                    <DialogClose asChild>
                        <Button className="rounded-xl w-20 h-9 " onClick={onCloseOrder} type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button className="rounded-xl w-20 h-9 bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)]" onClick={onCloseOrder} type="button" variant="outline">
                        Proceed
                    </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
    )
}