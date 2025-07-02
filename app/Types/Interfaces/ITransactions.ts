export interface ITransactionMeta {
    quantity: number;
    gas_type_id: number;
    amount: number;
    delivery_address: string;
    delivery_date: string;
    delivery_type: string;
    recurring: number;
    frequency?: string;
    frequency_number?: number;
    start_date?: string;
    end_date?: string | null;
    end_after: number;
    payment_method: string;
    callback_url: string;
    date_picked: number;
    order_number: string;
    description: string;
  }
  
  export interface IOrderDetails {
    slug: string;
    order_number: string;
    quantity: number;
    address: string;
    delivery_date: string;
    delivery_type: string;
    status: string;
    gas_price: string | null;
    total_amount: string;
    order_history: number;
    created_at: string;
    payment_status: string;
    credit_line_used: number;
    order_confirmed: number;
  }

  export interface ITransaction {
    slug: string;
    reference: string;
    amount: string;
    status: string;
    created_at: string;
    payment_method: string;
    description: string;
    meta: ITransactionMeta;
    order_details: IOrderDetails;
  }

  export interface ITransactionBreakdown{
    pendingTransactions: number;
    successfulTransactions: number
  }

  export interface IDisputeTypes {
    id: number;
    name: string;
    description: string;
  }

  export interface IDispute {
    dispute_type_id: string;
    description: string;
    attachments: string[];
    status: string;
    updated_at: string;
    created_at: string;
    id: number;
}

  export interface IDisputePayload{
    attachments: File[];
    description: string;
    dispute_type_id: number
  }

  export type TransactionFilterType = 
    | 'yesterday' 
    | '2_days_ago' 
    | '3_days_ago' 
    | 'last_7_days' 
    | 'last_30_days' 
    | 'last_90_days' 
    | 'last_365_days' 
    | 'last_month' 
    | 'last_12_months' 
    | 'last_year' 
    | 'date_range';