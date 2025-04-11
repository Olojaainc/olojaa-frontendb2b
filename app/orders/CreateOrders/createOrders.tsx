import { useState } from "react";
import Delivery from "./Delivery";
import OrderDetails from "./OrderDetails";
import { IOrderDetails } from "@/app/Types/Interfaces/IOrders";
import { useFormik } from "formik";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PaymentSummary from "./PaymentSummary";

interface ICreateOrder{
    isCreateOrder:boolean;
    onCloseOrder: () => void;
}

export default function CreateOrder({isCreateOrder, onCloseOrder}:ICreateOrder) {
  const [step, setStep] = useState(1);

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
      amount: 0
    } as IOrderDetails,
    onSubmit: (values) => {
      console.log('Final submission', values);
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
                />
            )

            }
            </DialogContent>
      </Dialog>
    )
}