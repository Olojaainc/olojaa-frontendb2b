import { Drawer } from "antd";
import { IoMdClose } from "react-icons/io";
import { Check } from "lucide-react";
import { IDisputePayload, ITransaction } from "../Types/Interfaces/ITransactions";
import { useFormik } from "formik";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DisputeTypesConstant } from "../Constants/DisputeTypes";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface IDisputeProps {
  onCloseDispute: () => void;
  openDispute: boolean;
  selectedItem: ITransaction | null;
}

export default function Dispute({ onCloseDispute, openDispute, selectedItem }: IDisputeProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const {values, handleChange, handleSubmit, setFieldValue} = useFormik({
        initialValues: {
        dispute_type_id: 0,
        description: '',
        attachments: []
        } as IDisputePayload,
        onSubmit: (values) => {
        console.log(values);
        }
    });

  return (
    <Drawer
      width="650px"
      title={'Dispute Transaction'}
      onClose={onCloseDispute}
      open={openDispute}
      closeIcon={false}
      extra={<IoMdClose className="w-6 h-6 cursor-pointer" onClick={onCloseDispute} />}
    >
      <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-semibold">Transaction ID: {selectedItem?.reference}</h2>
            <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-4">
                    <p>Select Dispute Type</p>
                    <div className="flex flex-col space-y-4">
                        {DisputeTypesConstant.map((dispute) => (
                            <div key={dispute.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`chk-opt-${dispute.id}`}
                                    className="border-gray-200 rounded-sm focus:ring-2 focus:ring-primary-400 checked:bg-primary-400 checked:border-primary-400"
                                    checked={values.dispute_type_id === dispute.id}
                                    onCheckedChange={() =>
                                        setFieldValue("dispute_type_id", dispute.id)
                                    }
                                >
                                    <Check className="w-4 h-4 text-white" />
                                </Checkbox>
                                <Label htmlFor={`chk-opt-${dispute.id}`}>{dispute.description}</Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid w-full gap-1.5">
                    <div className="flex justify-between">
                        <Label htmlFor="message">Description</Label>
                        <Label htmlFor="message">Optional</Label>
                    </div>
                    <Textarea 
                        className="h-36 border rounded-lg" 
                        placeholder="Describe context here..." 
                        id="message" 
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <div className="flex justify-between">
                        <Label htmlFor="picture">Attachment</Label>
                        <Label htmlFor="picture">Optional</Label>
                    </div>
                    <label
                        htmlFor="picture"
                        className="w-48 h-40 flex flex-col items-center justify-center border border-dashed cursor-pointer"
                    >
                        {values.attachments && values.attachments.length > 0 ? (
                            <div className="flex flex-col items-center justify-center space-y-1">
                                {values.attachments.map((file, index) => (
                                <span key={index} className="text-sm text-gray-700">
                                    {file.name}
                                </span>
                                ))}
                            </div>
                            ) : (
                            <>
                                <Plus className="w-6 h-6 text-gray-400" />
                                <span className="mt-2 text-sm text-gray-500">Click to upload</span>
                            </>
                        )}
                        <Input
                            id="picture"
                            type="file"
                            ref={fileInputRef}
                            multiple
                            className="hidden"
                            onChange={(e) => {
                                const files = e.target.files ? Array.from(e.target.files) : [];
                                setFieldValue("attachments", files);
                            }}
                        />
                    </label>
                </div>
            </div>
            <hr className="border border-[var-gray-200]" />
            <div className="flex justify-end">
                <Button onClick={onCloseDispute} type="button" className="border py-2 px-4 w-20 h-9 bg-primary-400 text-black rounded-xl mr-2">
                    Cancel
                </Button>
                <Button onClick={() => handleSubmit()} variant={'outline'} type="submit" className="rounded-xl w-28 h-9 py-2 px-4 bg-[var(--primary-400)] hover:text-white text-white hover:bg-[var(--primary-500)] text-sm">
                    Send Dispute
                </Button>
               
            </div>
        </div>
    </Drawer>
  );
}