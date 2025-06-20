/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { ApiErrorResponse, IOrderBreakdown, IOrderDetails } from "@/app/Types/Interfaces/IOrders";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormik } from "formik";
import AlertIcon from '@/public/AlertIcon.svg'
import { useEffect } from "react";
import Image from "next/image";
import { useApiPost } from "@/app/hooks/useApiPost";
import { toast } from "sonner";
import { getErrorMessage } from "@/app/hooks/getError";

interface IPaymentSummaryProps{
    formik: ReturnType<typeof useFormik<IOrderDetails>>;
    onPrev: () => void;
    onClose: () => void;
    orderErrors: ApiErrorResponse | undefined
    isLoading: boolean;
}


export default function PaymentSummary({onClose, isLoading, onPrev, formik}:IPaymentSummaryProps) {
    const {values, handleSubmit, setFieldValue} = formik
    // const [orderBreakdown, setOrderBreakdown] = useState<ApiResonse<IOrderBreakdown>>();
    // const [errors, setError] = useState<ApiErrorResponse>();
    const {  error, data, postApi } = useApiPost<IOrderBreakdown>(); 

    useEffect(() => {
        if(error){
            const errorMessage = getErrorMessage(error);
            toast.error("Error Occured!", {
                description: errorMessage,
            });
        }
    },[error])
  
    // const getOrderBreakDown = async () => {
      
    //     try {
    //       const res = await fetch('/api/order-breakdown', {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           gas_type_id: values.gas_type_id,
    //           quantity: values.quantity,
    //         }),
    //       });
      
    //       const data = await res.json();
      
    //       if (!res.ok) {
    //         setError(data);
    //         return;
    //       }
      
    //       setOrderBreakdown(data);
    //     } catch (error: unknown) {
    //         console.log('payment summary',error);
    //       setError({
    //         message: 'Network error. Please try again later.',
    //       });
    //     }
    // };

    useEffect(() => {
        if (values.gas_type_id && values.quantity) {
            postApi('/api/order-breakdown', { gas_type_id: values.gas_type_id, quantity: values.quantity });
        }
    }, [values.gas_type_id, values.quantity]);

    useEffect(() => {
        if (data) {
            setFieldValue('amount', data.total_price);
        }
    },[data]);



    return(
        <div className="p-6">
            <DialogHeader>
                <DialogTitle>Make an order</DialogTitle>
                <div className="pt-6 ">
                    <div className="flex justify-between items-center">
                        <div className="flex w-28 justify-between items-center">
                            <span className="w-6 h-6 bg-transparent 
                                border
                                border-[var(--gray-600)]
                                text-[var(--gray-600)]
                                rounded-3xl 
                                px-2 flex items-center justify-center
                                    "
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
                                px-2 flex items-center justify-center cursor-pointer "
                                onClick={onPrev}
                            >
                                2
                            </span>
                            <span className="text-[var(--gray-900)] text-xs font-medium">Delivery & Schedule</span>
                        </div>
                        <hr className="w-7" style={{ border: '1px thin #D1D5DB' }}/>
                        <div className="flex w-[155px] justify-between items-center">
                            <span className="w-6 h-6 bg-[var(--primary-400)]
                                text-white
                                rounded-3xl 
                                px-2 flex items-center justify-center"
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
                    <p className="text-2xl font-bold mt-4">Payment & Summary</p>
                    <p className="text-xs font-medium text-[var(--gray-600)] ">Review your order and make payment</p>
                </div>
                <p className="text-xl font-semibold mt-4">Order Summary</p>
                <div className="w-full content-between grid grid-cols-2 gap-y-4 gap-x-16">
                    <div className=" text-sm font-semibold text-[var(--gray-900)]">Quantity</div>
                    <div className="flex justify-end text-smfont-medium text-[var(--gray-600)]">{data?.quantity}KG</div>
                    <div className=" text-sm font-semibold text-[var(--gray-900)]">Gas Type</div>
                    <div className="flex justify-end text-smfont-medium text-[var(--gray-600)]">{data?.gas_type}</div>
                    <div className=" text-sm font-semibold text-[var(--gray-900)]">Provider</div>
                    <div className="flex justify-end text-smfont-medium text-[var(--gray-600)]">{values.gas_provider}</div>
                    <div className=" text-sm font-semibold text-[var(--gray-900)]">Price per KG</div>
                    <div className="flex justify-end text-smfont-medium text-[var(--gray-600)] ">₦{data?.price_per_kg.toFixed(2)}</div>
                    
                    {values.recurring === 0 && <>
                        <div></div>
                        <div className="flex w-[250px] justify-between ">
                            <p className="text-xl font-semibold text-[var(--gray-400)]">Sub Total</p>
                            <p className="text-xl font-semibold text-[var(--gray-400)]">₦{((data?.total_price ?? 0) - (data?.delivery_fee ?? 0) - (data?.service_charge ?? 0)).toFixed(2)}</p>
                        </div>
                        <div></div>
                        <div className="flex w-[250px] justify-between ">
                            <p className="text-xl font-semibold text-[var(--gray-400)]">Delivery Fee</p>
                            <p className="text-xl font-semibold text-[var(--gray-400)]">₦{data?.delivery_fee.toFixed(2)}</p>
                        </div>
                        <div></div>
                        <div className="flex space-x-2 w-auto justify-end ">
                            <p className="text-xl font-semibold text-[var(--gray-400)]">VAT</p>
                            <p className="text-xl font-semibold text-[var(--gray-400)]">₦{data?.service_charge.toFixed(2)}</p>
                        </div>
                        <div></div>
                        <div className="flex w-[250px] justify-between ">
                            <p className="text-2xl font-bold text-[var(--gray-600)]">Total</p>
                            <p className="text-2xl font-bold text-[var(--gray-600)]">₦{data?.total_price.toFixed(2)}</p>
                        </div>
                    </>}
                    { values.recurring === 1 && <div className="w-[550px] bg-[var(--blue-75)] flex flex-col gap-2 px-4 py-3 border border-blue-400 rounded-xl">
                        <div className="flex justify-start gap-2 items-center">
                            <Image src={AlertIcon} alt="alert" className="w-4 h-4"/>
                            <p className="text-[13px] text-[var(--gray-900)] font-semibold">For Recurring Order</p>
                        </div>
                        <div className=" content-between grid grid-cols-2 gap-y-4 gap-x-16">
                            <div className=" text-xs font-semibold text-[var(--gray-900)]">Start Date</div>
                            <div className="flex justify-end text-xs font-medium text-[var(--gray-600)]">{values?.start_date}</div>
                            <div className=" text-xs font-semibold text-[var(--gray-900)]">Frequency</div>
                            <div className="flex justify-end text-xs font-medium text-[var(--gray-600)]">Every {values.frequency_number} {values.frequency }</div>
                            <div className=" text-xs font-semibold text-[var(--gray-900)]">End</div>
                            { values.end_date ? <div className="flex justify-end text-xs font-medium text-[var(--gray-600)]">{values.end_date}</div> : 
                                <div className="flex justify-end text-xs font-medium text-[var(--gray-600)]">After {values.end_after} occurencies</div>
                            }
                            <div className=" text-xs font-semibold text-[var(--gray-900)]">Individual Order Total</div>
                            <div className="flex justify-end text-xs font-medium text-[var(--gray-600)] ">₦{((data?.total_price ?? 0) - (data?.delivery_fee ?? 0) - (data?.service_charge ?? 0)).toFixed(2)}</div>
                            <div className=" text-xs font-semibold text-[var(--gray-900)]">Delivery Fee per Order</div>
                            <div className="flex justify-end text-xs font-medium text-[var(--gray-600)]">₦{(data?.delivery_fee ?? 0).toFixed(2) }</div>
                            <div className=" text-xs font-semibold text-[var(--gray-900)]">VAT per Order</div>
                            <div className="flex justify-end text-xs font-medium text-[var(--gray-600)]">₦{(data?.service_charge ?? 0).toFixed(2)}</div>
                            <div className=" text-xs font-semibold text-[var(--gray-900)]">Grand Total</div>
                            <div className="flex justify-end text-xs font-medium text-[var(--gray-600)]">₦{(data?.total_price ?? 0).toFixed(2)}</div>
                        </div>
                    </div>
                    }
                </div>
                {
                    values.recurring === 1 &&  <div>
                        <p className="text-xs font-mediumn text-[var(--gray-900)]">
                            Please note: Pricing is subject to change due to economic realities and changing costs of items. A scheduled recurring order notification will be sent to your assigned mail and phone number.
                        </p>
                    </div>
                }
            </div>
            <hr className=" my-4" style={{ border: '1px thin #D1D5DB' }}/>
            <div className="p-4 flex flex-col gap-6">
                <p className="text-xl font-semibold">Select Payment Method</p>
                <RadioGroup onValueChange={(value) => setFieldValue('payment_method', value)} className="flex w-[350px] justify-between" value={values.payment_method}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paystack" id="r1" />
                        <Label className="text-sm font-normal text-[var(--gray-600)]" htmlFor="r1">Pay with Transfer</Label>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit_line" id="r2" />
                        <Label className="text-sm font-normal text-[var(--gray-600)]" htmlFor="r2">Pay with Credit Line</Label>
                    </div> */}
                </RadioGroup>
            </div>
            <hr className="my-4" style={{ border: '1px thin #D1D5DB' }}/>
            <DialogFooter className="sm:justify-end mt-4">
                <DialogClose asChild>
                    <Button className="rounded-xl w-20 h-9 " onClick={onClose} type="button" variant="outline">
                        Cancel
                    </Button>
                </DialogClose>
                <Button 
                    className="rounded-xl w-28 h-9 bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)]" 
                    type="button" 
                    variant="outline"
                    onClick={() => handleSubmit()}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Order' : 'Create Order'}
                </Button>
            </DialogFooter>
        </div>
    )
}