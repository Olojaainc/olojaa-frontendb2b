import { GasTypes } from "@/app/Types/Enums/OrderStatusEnum";
import { IOrderDetails } from "@/app/Types/Interfaces/IOrders";
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { useFormik } from 'formik';


interface ICreateOrder{
    formik: ReturnType<typeof useFormik<IOrderDetails>>;
    onNext: () => void;
    onClose: () => void;
}

export default function OrderDetails({onClose, onNext, formik}:ICreateOrder) { 
    const {handleChange, values} = formik
    return(
        <div className="p-6">
                <DialogHeader>
                    <DialogTitle>Make an order</DialogTitle>
                    <div className="pt-6 ">
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
                                    px-2 flex items-center justify-center cursor-pointer"
                                    onClick={onNext}
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
                    </div>

                </DialogHeader>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1"> 
                        <p className="text-2xl font-bold mt-4">Order Details</p>
                        <p className="text-xs font-medium text-[var(--gray-600)] ">Kindly enter the details of your order</p>
                    </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Enter how many quantity of gas you want to buy</p>
                        <Input name="quantity" type="text" onChange={handleChange} value={values.quantity} placeholder="20kg" className="border w-full h-11 rounded-xl placeholder:text-xs  "/>
                        <p className="text-sm font-medium text-[var(--primary-400)] ">Gas sells at ₦100 per KG</p>
                   </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Select the type of gas you want</p>
                        <Select name="gas_type_id" value={values.gas_type_id?.toString()}  onValueChange={(value) => handleChange({ target: { name: 'gas_type_id', value: parseInt(value) } })}>
                            <SelectTrigger className="w-full h-11 rounded-xl">
                                <SelectValue placeholder="Gas Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={GasTypes.LNG.toString()}>LNG (Cooking Gas)</SelectItem>
                                    <SelectItem value={GasTypes.CNG.toString()}>CNG</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                   </div>
                   <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[var(--gray-900)] ">Select your preferred gas provider</p>
                        <Select name="gas_provider" value={values.gas_provider}  onValueChange={(value) => handleChange({ target: { name: 'gas_provider', value } })}>
                            <SelectTrigger className="w-full h-11 rounded-xl">
                                <SelectValue placeholder="Gas provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Bovas Group">Bovas Group</SelectItem>
                                    <SelectItem value="General Gas">General Gas</SelectItem>
                                    <SelectItem value="Total Gas">Total Gas</SelectItem>
                                    <SelectItem value="Gas Land">Gas Land</SelectItem>
                                    <SelectItem value="Olarem">Olarem</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                   </div>
                </div>
               
                <DialogFooter className="sm:justify-end mt-4">
                    <DialogClose asChild>
                        <Button className="rounded-xl w-20 h-9 " onClick={onClose} type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button className="rounded-xl w-20 h-9 bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)]" onClick={onNext} type="button" variant="outline">
                        Proceed
                    </Button>
                </DialogFooter>
        </div>
    )
}