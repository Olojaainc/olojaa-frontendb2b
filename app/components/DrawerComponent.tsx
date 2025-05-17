/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer } from "antd";
import { IoMdClose } from "react-icons/io";
import { StatusComponent } from "../orders/StatusComponent";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { formatDateLong } from "../Utils/dateFormat";
import { DataTable } from "./DataTable";

interface IDrawerComponentProps<T> {
  columnsDetails: ColumnDef<T>[];
  onClose: () => void;
  onRowClick?: (row: T) => void;
  open: boolean;
  data: T | null;
  showPagination?: boolean;
  panelTitle: string;
  panelTypeID?: string;
  panelType: "order" | "delivery" | "transaction";
}

const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between">
    <span className="font-medium text-gray-700">{label}</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

function DrawerDetailsSection<T>({
  title,
  fields,
  data,
}: {
  title: string;
  fields: { label: string; render: (data: T) => React.ReactNode }[];
  data: T;
}) {
  return (
    <div className="w-full mt-8">
      <span className="font-bold">{title}</span>
      <div className="grid grid-cols-1 gap-3 p-3 border rounded-2xl mt-3">
        {fields.map((field, idx) => (
          <InfoRow key={idx} label={field.label} value={field.render(data)} />
        ))}
      </div>
    </div>
  );
}

export default function DrawerComponent<T extends Record<string, any>>({
  columnsDetails,
  panelType,
  onClose,
  open,
  panelTitle,
  panelTypeID,
  data,
  showPagination,
  onRowClick,
}: IDrawerComponentProps<T>) {

  if (!data) return null;

  const commonFields = [
    { label: "Order Date", render: (d: T) => formatDateLong(d.created_at) },
    { label: "Order Status", render: (d: T) => StatusComponent(d.status) },
    { label: "Order History", render: (d: T) => `${d.order_history ?? 0} previous orders` },
  ];

  const deliveryFields = [
    { label: "Delivery Date", render: (d: T) => formatDateLong(d.delivery_date) },
    { label: "Delivery Address", render: (d: T) => d.address },
    { label: "Delivery Status", render: (d: T) => StatusComponent(d.status) },
  ];

  const paymentFields = [
    { label: "Payment Status", render: (d: T) => StatusComponent(d.status) },
    { label: "Payment Date", render: (d: T) => formatDateLong(d.created_at) },
    { label: "Credit Line Used", render: (d: T) => d.credit_line_used ?? 0 },
    { label: "Amount Paid", render: (d: T) => d.total_amount ?? "—" },
  ];

  const paymentOverview = [
    { label: "Quantity", render: (d: T) => d.quantity ?? d.meta?.quantity },
    { label: "Price per KG", render: (d: T) => d.gas_price ?? d.meta?.gas_price },
    { label: "Amount Paid", render: (d: T) => d.total_amount ?? "—" },
  ];

  console.log(data);

  return (
    <Drawer
      width="650px"
      title={panelTitle}
      onClose={onClose}
      open={open}
      closeIcon={false}
      extra={<IoMdClose className="w-6 h-6 cursor-pointer" onClick={onClose} />}
    >
      <div className="flex justify-between mb-9">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-semibold">
            {panelType} ID: {panelTypeID}
          </h2>
          <div className="flex space-x-2">{StatusComponent(data.status)}</div>
        </div>
        <Button
          variant="outline"
          className="rounded-xl border-[var(--error-100)] text-[var(--error-400)] py-2 px-[14px] w-auto h-9 text-sm font-semibold"
        >
          {panelType === "transaction" ? "Dispute" : "Cancel Order"}
        </Button>
      </div>

      <DataTable showPagination={showPagination} columns={columnsDetails} data={data ? [data] : []} onRowClick={onRowClick} />

      <DrawerDetailsSection title="Order Details" fields={commonFields} data={data} />

      {(panelType === "order" || panelType === "delivery") && (
        <DrawerDetailsSection title="Delivery Details" fields={deliveryFields} data={data} />
      )}

      {(panelType === "order" || panelType === "transaction") && (
        <DrawerDetailsSection title="Payment Details" fields={paymentFields} data={data} />
      )}

      {panelType === "transaction" && (
        <DrawerDetailsSection title="Payment Overview" fields={paymentOverview} data={data} />
      )}
    </Drawer>
  );
}