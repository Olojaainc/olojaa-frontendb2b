'use client';
import { useState } from "react";
import Delivery from "./Delivery";
import OrderDetails from "./OrderDetails";
import { ApiErrorResponse, IOrderDetails } from "@/app/Types/Interfaces/IOrders";
import { useFormik } from "formik";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PaymentSummary from "./PaymentSummary";

interface ICreateOrder{
    isCreateOrder:boolean;
    onCloseOrder: () => void;
}

export default function CreateOrder({isCreateOrder, onCloseOrder}:ICreateOrder) {
  const [step, setStep] = useState(1);
  const [errors, setError] = useState<ApiErrorResponse>();
  const [isLoading, setLoading] = useState(false);
  
  const createOrder = async (values:IOrderDetails) => {
    try {
      setLoading(true);
      const res = await fetch('/api/create-order', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      const data = await res.json();
  
      if (res.ok && data?.data?.authorization_url) {
        console.log('Redirecting to:', data);
        window.location.href = data.data.authorization_url;
        return;
      }
  
      if (!res.ok) {
        setError(data);
      }
    } catch (error: unknown) {
      console.log('create orders error',error);
      setError({
        message: 'Network error. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };


  const formik = useFormik({
    initialValues: {
      gas_type_id: 0,
      quantity: 0,
      gas_provider: '',
      delivery_address: '',
      delivery_date: '',
      delivery_type: '',
      recurring: 0,
      frequency: '',
      frequency_number: 0,
      start_date: '',
      end_date: '',
      end_after: 0,
      payment_method: '',
      amount: 0,
      callback_url: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/orders' 
        : 'https://olojaa-frontendb2b-ashy.vercel.app/orders',
      date_picked: 0
    } as IOrderDetails,
    onSubmit: (values) => {
      createOrder(values);
    }
  });

    return(
        <Dialog open={isCreateOrder} onOpenChange={onCloseOrder}>
            <DialogContent className="max-w-[600px] max-h-[700px] h-auto p-0 overflow-scroll hide-scrollbar ">
            {step === 1 && (
                <OrderDetails
                    formik={formik}
                    onNext={() => setStep(2)}
                    onClose={onCloseOrder}
                />
            )}
    
            {step === 2 && (
                <Delivery
                    formik={formik}
                    onPrev={() => setStep(1)}
                    onNext={() => setStep(3)}
                    onClose={onCloseOrder}
                />
            )}
    
            { step === 3 && (
                <PaymentSummary 
                    formik={formik}
                    onPrev={() => setStep(2 )}
                    onClose={onCloseOrder}
                    orderErrors={errors}
                    isLoading={isLoading}
                />
            )

            }
            </DialogContent>
      </Dialog>
    )
}